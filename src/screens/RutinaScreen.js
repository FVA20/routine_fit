import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  ActivityIndicator, Alert,
} from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

export default function RutinaScreen({ navigation }) {
  const [perfil, setPerfil] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [generando, setGenerando] = useState(false);
  const [diaAbierto, setDiaAbierto] = useState(0);

  const uid = auth.currentUser?.uid;

  // ── Cargar perfil y rutina guardada ────────────────────────────
  const cargarDatos = useCallback(async () => {
    if (!uid) return;
    try {
      const snapPerfil = await getDoc(doc(db, 'usuarios', uid));
      if (snapPerfil.exists()) setPerfil(snapPerfil.data());

      const snapRutina = await getDoc(doc(db, 'rutinas', uid));
      if (snapRutina.exists()) setRutina(snapRutina.data().rutina);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar la información.');
    } finally {
      setCargando(false);
    }
  }, [uid]);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  // ── Generar rutina con Claude API ──────────────────────────────
  const generarRutina = async () => {
    if (!perfil) return;
    setGenerando(true);

    const { nombre, edad, genero, peso, talla, imc, pesoMeta, cuestionario } = perfil;
    const objetivo = cuestionario?.objetivo || 'No especificado';
    const estiloVida = cuestionario?.estiloVida || 'No especificado';
    const activo = cuestionario?.activo || 'No';
    const alimentacion = cuestionario?.alimentacion || 'No especificado';

    const kgDiferencia = Math.abs(pesoMeta - peso).toFixed(1);
    const tendencia = pesoMeta < peso ? `bajar ${kgDiferencia} kg` : pesoMeta > peso ? `ganar ${kgDiferencia} kg` : 'mantener peso';

    const diasNum =
      estiloVida.includes('5-6') ? 5 :
      estiloVida.includes('3-4') ? 4 : 3;

    const nivelFitness =
      estiloVida.includes('5-6') ? 'avanzado' :
      estiloVida.includes('3-4') ? 'intermedio' : 'principiante';

    const imcCat = imcCategoria(imc);

    const prompt = `Eres un entrenador personal certificado con 15 años de experiencia. Tu tarea es crear una rutina de gimnasio COMPLETAMENTE PERSONALIZADA y ÚNICA para este usuario específico. Cada decisión que tomes debe basarse directamente en sus datos.

━━━━━━━━━━━━━━━━━━━━━━━━
PERFIL COMPLETO DEL USUARIO
━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${nombre}
Género: ${genero}
Edad: ${edad} años
Peso actual: ${peso} kg | Talla: ${talla} cm | IMC: ${imc} (${imcCat})
Peso meta: ${pesoMeta} kg → necesita ${tendencia}
Objetivo: ${objetivo}
Nivel de fitness: ${nivelFitness} (entrena ${estiloVida})
Se mantiene activo fuera del gym: ${activo}
Alimentación: ${alimentacion}
Días disponibles: ${diasNum} días/semana

━━━━━━━━━━━━━━━━━━━━━━━━
DECISIONES QUE DEBES TOMAR SEGÚN SUS DATOS
━━━━━━━━━━━━━━━━━━━━━━━━

VOLUMEN (series por ejercicio):
- Principiante → 3 series | Intermedio → 4 series | Avanzado → 4-5 series

REPETICIONES según objetivo:
- "Bajar de peso" → 15-20 reps, descanso 30-45 seg, ejercicios compuestos + cardio final
- "Bajar mi porcentaje de grasa" → 12-15 reps, descanso 45-60 seg, superseries si es intermedio/avanzado
- "Incremento de masa muscular" → 8-12 reps, descanso 60-90 seg, progresión de carga

AJUSTE POR IMC:
- Bajo peso: priorizar ejercicios compuestos de fuerza, más series de empuje/jalón
- Normal: equilibrio entre fuerza e hipertrofia
- Sobrepeso: priorizar cardio integrado, circuitos, menos descanso
- Obesidad: ejercicios de bajo impacto, máquinas en lugar de peso libre, menos volumen inicial

AJUSTE POR GÉNERO:
- Masculino: mayor énfasis en tren superior (pecho, espalda, hombros)
- Femenino: mayor énfasis en tren inferior (glúteos, femorales, cuádriceps)

AJUSTE POR EDAD:
- Menor de 25: puede manejar mayor volumen e intensidad
- 25-40: equilibrio fuerza/hipertrofia, buena recuperación
- Mayor de 40: mayor énfasis en calentamiento, menos volumen, más descanso

AJUSTE POR ALIMENTACIÓN:
- "No": menos volumen total (el cuerpo no tiene suficiente combustible para recuperarse)
- "A veces": volumen moderado
- "Sí": puede manejar el volumen completo

━━━━━━━━━━━━━━━━━━━━━━━━
EJERCICIOS DISPONIBLES EN LA APP (DEBES ELEGIR SOLO DE ESTA LISTA)
━━━━━━━━━━━━━━━━━━━━━━━━
TREN INFERIOR:
- Cuádriceps: Sentadilla en Máquina Smith, Sentadilla con Barra Libre, Máquina Hack, Máquina Prensa, Zancadas, Sentadilla Goblet, Extensiones en Máquina
- Femorales: Curl Femoral Acostado, Curl Femoral Sentado, Peso Muerto Rumano
- Glúteos: Búlgaras, Hip Thrust, Patada en Polea
- Pantorrillas: Elevación de Pantorrillas de Pie en Máquina Smith, Extensión de Gemelos en Máquina
- Aductores: Máquina de Aductores
- Abductores: Máquina de Abductores

TREN SUPERIOR:
- Pecho: Press Inclinado, Press Plano, Apertura en Polea, Apertura en Máquina, Fondos, Planchas, Máquina Hammer para Pecho
- Espalda: Jalón al Pecho, Remo en Máquina, Remo en Polea, Pullover en Polea, Remo en T, Remo en Smith, Jalón al Pecho Agarre Supino, Peso Muerto para Lumbar, Jalón al Pecho Agarre Cerrado, Dominadas, Remo en Polea Agarre Cerrado, Remo en Polea Agarre Abierto
- Hombros: Vuelos Laterales, Vuelos Frontales, Press Militar en Smith, Press Militar con Mancuerna, Press Militar en Máquina Hammer, Tras Nuca en Smith, Posteriores en Máquina, Vuelos Laterales en Máquina
- Bíceps: Curl de Bíceps con Barra Z, Curl de Bíceps con Barra, Curl de Bíceps con Mancuerna, Curls de Bíceps en Polea, Curls de Bíceps en Máquina, Curl Martillo con Mancuerna, Curls de Bíceps con Banco Inclinado
- Tríceps: Jalón en Polea con Cuerda, Jalón en Polea con Barra, Press Francés, Extensión Tras Nuca con Mancuerna, Extensión Tras Nuca en Polea, Patada de Tríceps con Mancuerna, Patada de Tríceps en Polea, Cruce de Poleas
- Antebrazos: Curl de Muñeca con Mancuerna Sentado, Curl Invertido con Barra de Pie, Curl de Antebrazo con Barra 1 Mano

━━━━━━━━━━━━━━━━━━━━━━━━
DISTRIBUCIÓN DE DÍAS (${diasNum} días de entreno + descansos hasta completar 7 días)
━━━━━━━━━━━━━━━━━━━━━━━━
${diasNum === 3 ? `3 días: Día A (Piernas completo), Día B (Pecho + Tríceps + Hombros), Día C (Espalda + Bíceps)` :
  diasNum === 4 ? `4 días: Día A (Cuádriceps + Pantorrillas), Día B (Pecho + Tríceps), Día C (Femorales + Glúteos), Día D (Espalda + Bíceps + Hombros)` :
  `5 días: Día A (Cuádriceps), Día B (Pecho + Tríceps), Día C (Femorales + Glúteos), Día D (Espalda + Bíceps), Día E (Hombros + Antebrazos)`}
Distribuye los descansos estratégicamente (nunca 3 días de entreno seguidos sin descanso).

━━━━━━━━━━━━━━━━━━━━━━━━
REGLAS FINALES
━━━━━━━━━━━━━━━━━━━━━━━━
- El nombreRutina debe ser único y reflejar el objetivo de ${nombre}
- La descripcion debe mencionar datos específicos del usuario (IMC, objetivo, nivel)
- Los consejos deben mencionar a ${nombre} por nombre y referenciar sus números reales (peso actual, meta, etc.)
- El campo "consejo" de cada ejercicio debe ser un tip técnico específico para el nivel ${nivelFitness}
- Para principiantes: usa ejercicios de máquinas antes que peso libre
- Para avanzados: incluye ejercicios más complejos como Sentadilla con Barra Libre, Dominadas, Peso Muerto Rumano

Responde ÚNICAMENTE con el JSON, sin texto antes ni después, sin markdown, sin bloques de código:
{
  "nombreRutina": "...",
  "descripcion": "...",
  "diasEntrenamiento": ${diasNum},
  "dias": [
    {
      "dia": "Lunes",
      "tipo": "entrenamiento",
      "musculo": "...",
      "ejercicios": [
        {
          "nombre": "...",
          "series": 4,
          "repeticiones": "12",
          "descanso": "60 seg",
          "consejo": "..."
        }
      ]
    },
    {
      "dia": "Martes",
      "tipo": "descanso",
      "musculo": "Descanso activo",
      "ejercicios": []
    }
  ],
  "consejos": ["...", "...", "..."]
}`;

    try {
      if (!API_KEY || API_KEY === 'aqui-va-tu-api-key') {
        throw new Error('API Key no configurada. Agrega tu clave en el archivo .env');
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 2500,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`API Error ${response.status}: ${data.error?.message || JSON.stringify(data)}`);
      }

      // Limpiar respuesta por si Claude añade bloques de código
      let texto = data.content[0].text.trim();
      texto = texto.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

      let rutinaGenerada;
      try {
        rutinaGenerada = JSON.parse(texto);
      } catch (parseError) {
        throw new Error(`Error al leer la respuesta de la IA. Intenta de nuevo.`);
      }

      // Guardar en Firestore
      await setDoc(doc(db, 'rutinas', uid), {
        rutina: rutinaGenerada,
        generadaEn: new Date(),
        perfilUsado: { objetivo, estiloVida, peso, pesoMeta, genero, edad, imc, alimentacion, nivelFitness },
      });

      setRutina(rutinaGenerada);
      setDiaAbierto(0);
    } catch (e) {
      Alert.alert('Error', e.message || 'No se pudo generar la rutina. Intenta de nuevo.');
    } finally {
      setGenerando(false);
    }
  };

  const confirmarRegenerar = () => {
    Alert.alert(
      'Regenerar rutina',
      '¿Quieres generar una nueva rutina? Se reemplazará la actual.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Regenerar', onPress: generarRutina },
      ]
    );
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (cargando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // ── Generando ────────────────────────────────────────────────────
  if (generando) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.generandoTexto}>Creando tu rutina personalizada...</Text>
        <Text style={styles.generandoSub}>La IA está analizando tus datos</Text>
      </View>
    );
  }

  // ── Sin rutina ───────────────────────────────────────────────────
  if (!rutina) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.sinRutinaContainer}>
          <Text style={styles.sinRutinaTitulo}>Tu rutina personalizada</Text>
          <Text style={styles.sinRutinaDesc}>
            Basándonos en tu perfil, objetivo y estilo de vida, nuestra IA creará una rutina diseñada exclusivamente para ti.
          </Text>
          <View style={styles.datosCard}>
            <Text style={styles.datosCardTitulo}>Se tomará en cuenta</Text>
            <FilaDato label="Objetivo" valor={perfil?.cuestionario?.objetivo || '—'} />
            <FilaDato label="Estilo de vida" valor={perfil?.cuestionario?.estiloVida || '—'} />
            <FilaDato label="Peso actual" valor={`${perfil?.peso} kg`} />
            <FilaDato label="Peso meta" valor={`${perfil?.pesoMeta} kg`} />
            <FilaDato label="IMC" valor={`${perfil?.imc} — ${imcCategoria(perfil?.imc)}`} />
          </View>
          <TouchableOpacity style={styles.btnGenerar} onPress={generarRutina}>
            <Text style={styles.btnGenerarTexto}>Generar mi rutina</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Rutina generada ──────────────────────────────────────────────
  const diasEntrenamiento = rutina.dias?.filter(d => d.tipo === 'entrenamiento') || [];
  const diasDescanso = rutina.dias?.filter(d => d.tipo === 'descanso') || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.rutinaTag}>RUTINA PERSONALIZADA</Text>
        <Text style={styles.rutinaNombre}>{rutina.nombreRutina}</Text>
        <Text style={styles.rutinaDesc}>{rutina.descripcion}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{diasEntrenamiento.length}</Text>
            <Text style={styles.statLabel}>días entreno</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{diasDescanso.length}</Text>
            <Text style={styles.statLabel}>días descanso</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>
              {diasEntrenamiento.reduce((acc, d) => acc + (d.ejercicios?.length || 0), 0)}
            </Text>
            <Text style={styles.statLabel}>ejercicios</Text>
          </View>
        </View>
      </View>

      {/* Selector de días */}
      <Text style={styles.seccion}>SEMANA</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
        {rutina.dias?.map((dia, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.diaTab,
              diaAbierto === index && styles.diaTabActivo,
              dia.tipo === 'descanso' && styles.diaTabDescanso,
              diaAbierto === index && dia.tipo === 'descanso' && styles.diaTabDescansoActivo,
            ]}
            onPress={() => setDiaAbierto(index)}
          >
            <Text style={[styles.diaTabTexto, diaAbierto === index && styles.diaTabTextoActivo]}>
              {dia.dia.slice(0, 3).toUpperCase()}
            </Text>
            <Text style={[styles.diaTabSub, diaAbierto === index && styles.diaTabSubActivo]}>
              {dia.tipo === 'descanso' ? 'DESC' : dia.musculo?.split(' ')[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Contenido del día seleccionado */}
      {rutina.dias?.[diaAbierto] && (
        <View style={styles.diaContenido}>
          <Text style={styles.diaNombre}>{rutina.dias[diaAbierto].dia}</Text>
          <Text style={styles.diaMusculo}>{rutina.dias[diaAbierto].musculo}</Text>

          {rutina.dias[diaAbierto].tipo === 'descanso' ? (
            <View style={styles.descansoBox}>
              <Text style={styles.descansoTexto}>Día de recuperación</Text>
              <Text style={styles.descansosub}>Descansa, estira o haz cardio ligero. Tu cuerpo necesita recuperarse para crecer.</Text>
            </View>
          ) : (
            rutina.dias[diaAbierto].ejercicios?.map((ej, i) => (
              <View key={i} style={styles.ejercicioCard}>
                <View style={styles.ejercicioNum}>
                  <Text style={styles.ejercicioNumTexto}>{i + 1}</Text>
                </View>
                <View style={styles.ejercicioInfo}>
                  <Text style={styles.ejercicioNombre}>{ej.nombre}</Text>
                  <View style={styles.ejercicioStats}>
                    <View style={styles.ejercicioStat}>
                      <Text style={styles.ejercicioStatVal}>{ej.series}</Text>
                      <Text style={styles.ejercicioStatLabel}>series</Text>
                    </View>
                    <View style={styles.ejercicioStat}>
                      <Text style={styles.ejercicioStatVal}>{ej.repeticiones}</Text>
                      <Text style={styles.ejercicioStatLabel}>reps</Text>
                    </View>
                    <View style={styles.ejercicioStat}>
                      <Text style={styles.ejercicioStatVal}>{ej.descanso}</Text>
                      <Text style={styles.ejercicioStatLabel}>descanso</Text>
                    </View>
                  </View>
                  {ej.consejo ? (
                    <Text style={styles.ejercicioConsejo}>💡 {ej.consejo}</Text>
                  ) : null}
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* Consejos */}
      {rutina.consejos?.length > 0 && (
        <>
          <Text style={styles.seccion}>CONSEJOS PARA TI</Text>
          <View style={styles.consejosCard}>
            {rutina.consejos.map((consejo, i) => (
              <View key={i} style={styles.consejoFila}>
                <View style={styles.consejoPunto} />
                <Text style={styles.consejoTexto}>{consejo}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Botón regenerar */}
      <TouchableOpacity style={styles.btnRegenerar} onPress={confirmarRegenerar}>
        <Text style={styles.btnRegenerarTexto}>Regenerar rutina</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Helpers
function imcCategoria(v) {
  if (!v) return '';
  if (v < 18.5) return 'Bajo peso';
  if (v < 25) return 'Normal';
  if (v < 30) return 'Sobrepeso';
  return 'Obesidad';
}

function FilaDato({ label, valor }) {
  return (
    <View style={styles.filaDato}>
      <Text style={styles.filaDatoLabel}>{label}</Text>
      <Text style={styles.filaDatoValor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 60 },
  inner: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 30 },
  generandoTexto: { fontSize: 18, fontWeight: '800', color: '#000', marginTop: 20, textAlign: 'center' },
  generandoSub: { fontSize: 14, color: '#888', marginTop: 8, textAlign: 'center' },

  backBtn: { marginBottom: 20 },
  backArrow: { fontSize: 28, color: '#000', fontWeight: '300' },

  // Sin rutina
  sinRutinaContainer: { flex: 1, paddingBottom: 40 },
  sinRutinaTitulo: { fontSize: 30, fontWeight: '900', color: '#000', marginBottom: 12 },
  sinRutinaDesc: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 28 },
  datosCard: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 16,
    padding: 20, marginBottom: 28,
  },
  datosCardTitulo: { fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 1.5, marginBottom: 16 },
  filaDato: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  filaDatoLabel: { fontSize: 14, color: '#666' },
  filaDatoValor: { fontSize: 14, fontWeight: '700', color: '#000' },
  btnGenerar: {
    backgroundColor: '#000', borderRadius: 14,
    paddingVertical: 18, alignItems: 'center',
  },
  btnGenerarTexto: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },

  // Header card
  headerCard: {
    backgroundColor: '#000', borderRadius: 20,
    padding: 24, marginBottom: 28,
  },
  rutinaTag: { fontSize: 11, fontWeight: '700', color: '#666', letterSpacing: 2, marginBottom: 8 },
  rutinaNombre: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 10 },
  rutinaDesc: { fontSize: 13, color: '#aaa', lineHeight: 20, marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statNum: { fontSize: 28, fontWeight: '900', color: '#fff' },
  statLabel: { fontSize: 11, color: '#666', marginTop: 2 },
  statDivider: { width: 1, height: 40, backgroundColor: '#333' },

  // Sección
  seccion: { fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 1.5, marginBottom: 14 },

  // Tabs días
  diasScroll: { marginBottom: 20 },
  diaTab: {
    width: 64, paddingVertical: 12, borderRadius: 14, borderWidth: 1.5,
    borderColor: '#e0e0e0', alignItems: 'center', marginRight: 10,
  },
  diaTabActivo: { backgroundColor: '#000', borderColor: '#000' },
  diaTabDescanso: { borderColor: '#e0e0e0', backgroundColor: '#fafafa' },
  diaTabDescansoActivo: { backgroundColor: '#333', borderColor: '#333' },
  diaTabTexto: { fontSize: 13, fontWeight: '800', color: '#000' },
  diaTabTextoActivo: { color: '#fff' },
  diaTabSub: { fontSize: 9, color: '#aaa', marginTop: 3, fontWeight: '600' },
  diaTabSubActivo: { color: '#888' },

  // Contenido día
  diaContenido: { marginBottom: 28 },
  diaNombre: { fontSize: 26, fontWeight: '900', color: '#000', marginBottom: 2 },
  diaMusculo: { fontSize: 14, color: '#888', marginBottom: 20, fontWeight: '600' },

  // Descanso
  descansoBox: {
    borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 16,
    padding: 24, alignItems: 'center',
  },
  descansoTexto: { fontSize: 18, fontWeight: '800', color: '#000', marginBottom: 8 },
  descansosub: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20 },

  // Ejercicio card
  ejercicioCard: {
    flexDirection: 'row', borderWidth: 1.5, borderColor: '#e0e0e0',
    borderRadius: 16, padding: 16, marginBottom: 12,
  },
  ejercicioNum: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#000', justifyContent: 'center', alignItems: 'center',
    marginRight: 14, marginTop: 2,
  },
  ejercicioNumTexto: { fontSize: 14, fontWeight: '900', color: '#fff' },
  ejercicioInfo: { flex: 1 },
  ejercicioNombre: { fontSize: 15, fontWeight: '800', color: '#000', marginBottom: 10 },
  ejercicioStats: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  ejercicioStat: { alignItems: 'center' },
  ejercicioStatVal: { fontSize: 18, fontWeight: '900', color: '#000' },
  ejercicioStatLabel: { fontSize: 10, color: '#aaa', fontWeight: '600' },
  ejercicioConsejo: { fontSize: 12, color: '#666', fontStyle: 'italic', lineHeight: 18 },

  // Consejos
  consejosCard: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 16,
    padding: 20, marginBottom: 24, gap: 14,
  },
  consejoFila: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  consejoPunto: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#000', marginTop: 5 },
  consejoTexto: { flex: 1, fontSize: 14, color: '#333', lineHeight: 20 },

  // Regenerar
  btnRegenerar: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  btnRegenerarTexto: { fontSize: 15, fontWeight: '700', color: '#000' },
});
