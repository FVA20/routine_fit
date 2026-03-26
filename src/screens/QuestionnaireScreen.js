import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert
} from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const preguntas = [
  {
    id: 'objetivo',
    pregunta: '¿Cuál es tu objetivo?',
    opciones: ['Bajar de peso', 'Bajar mi porcentaje de grasa', 'Incremento de masa muscular'],
  },
  {
    id: 'estiloVida',
    pregunta: '¿Cómo es tu estilo de vida?',
    opciones: ['Sedentario', 'Entreno 3-4 veces por semana', 'Entreno 5-6 veces por semana'],
  },
  {
    id: 'activo',
    pregunta: '¿Te mantienes activo/a?',
    opciones: ['Sí', 'No'],
  },
  {
    id: 'alimentacion',
    pregunta: '¿Comes saludable?',
    opciones: ['Sí', 'No', 'A veces'],
  },
];

export default function QuestionnaireScreen({ navigation }) {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(false);

  const preguntaActual = preguntas[paso];
  const seleccion = respuestas[preguntaActual.id];

  const seleccionar = (opcion) => {
    setRespuestas({ ...respuestas, [preguntaActual.id]: opcion });
  };

  const siguiente = async () => {
    if (!seleccion) {
      Alert.alert('Selecciona una opción', 'Por favor elige una opción para continuar.');
      return;
    }

    if (paso < preguntas.length - 1) {
      setPaso(paso + 1);
    } else {
      // Última pregunta — guardar y continuar
      setLoading(true);
      try {
        const uid = auth.currentUser.uid;
        await updateDoc(doc(db, 'usuarios', uid), {
          cuestionario: { ...respuestas, [preguntaActual.id]: seleccion },
          perfilCompleto: true,
        });
        navigation.replace('Home');
      } catch (error) {
        Alert.alert('Error', 'No se pudo guardar. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }
  };

  const anterior = () => {
    if (paso > 0) setPaso(paso - 1);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>

      {/* Progreso */}
      <View style={styles.progresoContainer}>
        {preguntas.map((_, i) => (
          <View key={i} style={[styles.progresoPunto, i <= paso && styles.progresoPuntoActivo]} />
        ))}
      </View>

      <Text style={styles.numeroPregunta}>Pregunta {paso + 1} de {preguntas.length}</Text>
      <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>

      {/* Opciones */}
      <View style={styles.opciones}>
        {preguntaActual.opciones.map((opcion) => (
          <TouchableOpacity
            key={opcion}
            style={[styles.opcionBtn, seleccion === opcion && styles.opcionBtnActivo]}
            onPress={() => seleccionar(opcion)}
          >
            <Text style={[styles.opcionText, seleccion === opcion && styles.opcionTextActivo]}>
              {opcion}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones navegación */}
      <View style={styles.botonesRow}>
        {paso > 0 && (
          <TouchableOpacity style={styles.btnAtras} onPress={anterior}>
            <Text style={styles.btnAtrasText}>← Atrás</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btnSiguiente, paso === 0 && styles.btnSiguienteCompleto]}
          onPress={siguiente}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnSiguienteText}>
                {paso === preguntas.length - 1 ? 'Finalizar' : 'Siguiente →'}
              </Text>
          }
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 30, paddingTop: 70, paddingBottom: 50 },
  progresoContainer: { flexDirection: 'row', gap: 8, marginBottom: 40 },
  progresoPunto: {
    flex: 1, height: 5, borderRadius: 10, backgroundColor: '#eee',
  },
  progresoPuntoActivo: { backgroundColor: '#000' },
  numeroPregunta: { fontSize: 14, color: '#999', marginBottom: 10, fontWeight: '600' },
  pregunta: { fontSize: 26, fontWeight: '900', color: '#000', marginBottom: 30, lineHeight: 34 },
  opciones: { gap: 14 },
  opcionBtn: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 14,
    paddingVertical: 18, paddingHorizontal: 20,
  },
  opcionBtnActivo: { backgroundColor: '#000' },
  opcionText: { fontSize: 16, fontWeight: '600', color: '#000' },
  opcionTextActivo: { color: '#fff' },
  botonesRow: { flexDirection: 'row', gap: 12, marginTop: 40 },
  btnAtras: {
    flex: 1, borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  btnAtrasText: { fontSize: 16, fontWeight: '600', color: '#000' },
  btnSiguiente: {
    flex: 2, backgroundColor: '#000', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  btnSiguienteCompleto: { flex: 1 },
  btnSiguienteText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
