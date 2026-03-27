import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';

function EjercicioAnimado({ imagenes }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [frameActual, setFrameActual] = useState(0);

  useEffect(() => {
    const ciclo = () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setFrameActual(f => (f === 0 ? 1 : 0));
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    };
    const intervalo = setInterval(ciclo, 900);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.gifContainer}>
      <Animated.Image
        source={imagenes[frameActual]}
        style={[styles.gif, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const ejerciciosPorGrupo = {
  'Cuádriceps': [
    {
      nombre: 'Sentadilla en Máquina Smith',
      descripcion:
        'Para un mayor control en técnica, es bueno para hipertrofiar y hacer que el músculo se estimule mejor. Tener en cuenta la postura y la distancia de los pies, para que se pueda sentir el músculo de una manera efectiva.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y progresivas',
      imagenes: [
        require('../assets/logosentadilla1.png'),
        require('../assets/logosentadilla2.png'),
      ],
    },
    {
      nombre: 'Sentadilla con Barra Libre',
      descripcion:
        'Para mayor fuerza y resistencia. Para personas que ya tienen técnica y control al bajar. No apto para personas que recién empiezan a entrenar. No es recomendada para hipertrofia, por lo que no hay ningún soporte y puede causar lesiones.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/logosentadilla3.png'),
        require('../assets/logosentadilla4.png'),
      ],
    },
    {
      nombre: 'Máquina Hack',
      descripcion:
        'Para una estimulación completa y mejor crecimiento muscular. La realización del ejercicio es como la de una sentadilla, pero de manera vertical, haciendo que el músculo tenga un rango de mayor profundidad. Tener en cuenta la posición al bajar y la distancia de los pies.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/ejerciciohack1.png'),
        require('../assets/ejerciciohack2.png'),
      ],
    },
    {
      nombre: 'Máquina Prensa',
      descripcion:
        'Mayor crecimiento muscular, mayor fuerza y resistencia. La realización de este ejercicio es eficaz para el crecimiento muscular del cuádricep. Se tiene que mantener cuidado al realizarlo por la postura de las piernas al bajar, siempre se tiene que mantener una pequeña intersección con la rodilla, es decir no estirarla por completo para evitar lesiones o desgarros de tendones.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/ejercicioprensa1.png'),
        require('../assets/ejercicioprensa2.png'),
      ],
    },
    {
      nombre: 'Zancadas',
      descripcion:
        'Ejercicio con un gran rango y resistencia. Para la realización del ejercicio se puede hacer con peso o sin peso, dependiendo de la experiencia de la persona. Al hacerlo sin peso son para personas que recién empiezan a entrenar, mayor facilidad al realizarlo, mejor control y estimulación perfecta. Para personas con experiencia o avanzadas, lo más recomendado es realizarlo con mancuerna para una mejor estabilidad, una mejor estimulación y teniendo un rango de bajada que será eficaz al crecimiento muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/ejerciciozancadas1.png'),
        require('../assets/ejerciciozancadas2.png'),
      ],
    },
    {
      nombre: 'Sentadilla Goblet',
      descripcion:
        'Ejercicio con una gran eficacia al llevar al fallo muscular. La realización del ejercicio se debe tener en cuenta la posición de los pies y el rango de bajada. Lo más recomendable es pisando con el talón un disco, para que al realizarlo sea más fácil la postura. Al subir siempre tiene que tener una intersección con la rodilla, para que solo el músculo indicado sea estimulado y no haya ningún otro músculo involucrado.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/ejerciciogooblet1.png'),
        require('../assets/ejerciciogooblet2.png'),
      ],
    },
    {
      nombre: 'Extensiones en Máquina',
      descripcion:
        'Uno de los mejores ejercicios para obtener un crecimiento de la cabeza larga del cuádriceps. La realización del ejercicio se debe hacer de manera controlada para que tenga una mejor estimulación. Se debe tener en cuenta que la bajada tiene que ser controlada para evitar lesiones. Al subir, apretar por 2 segundos para obtener un mejor estímulo y poder llegar al fallo muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/extension1.png'),
        require('../assets/extension2.png'),
      ],
    },
  ],
  'Femorales': [
    {
      nombre: 'Curl Femoral Acostado',
      descripcion:
        'Uno de los mejores ejercicios para el trabajo de femoral con mejor rango y amplitud. El ejercicio se debe desarrollar de una manera que no involucre la espalda ni la lumbar. Se debe acostar por completo, con la espalda recta y con el glúteo parado. Tiene que tener en cuenta que el ejercicio se tiene que hacer de manera controlada para un mayor estímulo al músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas y peso progresivo',
      imagenes: [
        require('../assets/femoralechado1.png'),
        require('../assets/femoralechado2.png'),
      ],
    },
    {
      nombre: 'Curl Femoral Sentado',
      descripcion:
        'Ejercicio más controlado y con buena estimulación al músculo. Al realizar el ejercicio se tiene que tener en cuenta que al bajar tiene que aguantar 2 segundos para que se estimule bien el músculo. La subida se tiene que hacer de manera controlada, para no involucrar otro músculo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/femoralsentado1.png'),
        require('../assets/femoralsentado2.png'),
      ],
    },
    {
      nombre: 'Peso Muerto Rumano',
      descripcion:
        'Ejercicio con un gran rango de estimulación. Al realizar este ejercicio se tiene que tener en cuenta el rango de bajada. Para las personas que recién empiezan en el gym es recomendable realizarlo con mancuernas para que tengan mejor equilibrio. En cambio las personas que ya son avanzadas o con experiencia es recomendable con barra. El rango de bajada se tiene que hacer sin doblar mucho la parte de la rodilla y manteniendo una postura sacando glúteos para que se pueda sentir el estímulo. Al subir se tiene que apretar el glúteo para que no involucre la lumbar, pero toda la estimulación se va a sentir en el femoral.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/pesorumano1.png'),
        require('../assets/pesorumano2.png'),
      ],
    },
  ],
  'Glúteos': [
    {
      nombre: 'Búlgaras',
      descripcion:
        'Uno de los ejercicios con buena estimulación. Al realizar el ejercicio se tiene que tener en cuenta la distancia de las piernas. Lo más recomendable para personas que recién comienzan en el gym es hacerlo sin peso o con mancuernas de poco peso, para que tengan un mejor control. En cambio para las personas con experiencia o con mayor control se recomienda hacerlo en una máquina Smith para un mejor rango y mejor fatiga muscular. Tener en cuenta el rango del ejercicio para evitar lesiones con la lumbar.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/bulgara1.png'),
        require('../assets/bulgara2.png'),
      ],
    },
    {
      nombre: 'Hip Thrust',
      descripcion:
        'Uno de los mejores ejercicios para una gran estimulación. Al realizar este ejercicio tener en cuenta la posición y la distancia de las piernas. El ejercicio se realiza con barra. Para las personas que recién comienzan es más factible hacerlo sin peso, para que aprendan la técnica. Para las personas con experiencia o avanzadas pueden realizarlo con un peso que controlen de manera controlada. Si no controlan la bajada pueden causar lesiones a la lumbar.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/hiptrust1.png'),
        require('../assets/hiptrust2.png'),
      ],
    },
    {
      nombre: 'Patada en Polea',
      descripcion:
        'Uno de los mejores ejercicios para llegar a la fatiga muscular. Al realizar el ejercicio tener en cuenta la posición y el rango de la polea. Se recomienda que el jalón de la polea esté en tu cintura, para que al realizar la patada tengas un mayor estímulo y de una manera controlada. Siempre apoyándose a la polea y estirar toda la pierna apretando el glúteo.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/patada1.png'),
        require('../assets/patada2.png'),
      ],
    },
  ],
  'Pantorrillas': [
    {
      nombre: 'Elevación de Pantorrillas de Pie en Máquina Smith',
      descripcion:
        'Uno de los ejercicios para estimulamiento de gemelos. Al realizar el ejercicio se tiene que hacer de manera controlada.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/pantorilla1.png'),
        require('../assets/pantorilla2.png'),
      ],
    },
    {
      nombre: 'Extensión de Gemelos en Máquina',
      descripcion:
        'Uno de los mejores ejercicios con más rango de bajada. Al realizar el ejercicio se tiene que tener en cuenta el peso. Se tiene que realizar de una manera controlada para que se llegue a una fatiga muscular.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso único',
      imagenes: [
        require('../assets/pantorilla3.png'),
        require('../assets/pantorilla4.png'),
      ],
    },
  ],
  'Aductores': [
    {
      nombre: 'Máquina de Aductores',
      descripcion:
        'Uno de los mejores ejercicios con excelente estimulación para la parte de aducción de la pierna. Al realizarse el ejercicio se tiene que tener en cuenta la apertura de las piernas, por el mismo motivo de que no haya desgarros ni lesiones.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/aductor1.png'),
        require('../assets/aductor2.png'),
      ],
    },
  ],
  'Abductores': [
    {
      nombre: 'Máquina de Abductores',
      descripcion:
        'Uno de los mejores ejercicios para abducción. Al realizar este ejercicio se tiene que tener en cuenta el estímulo que generan, hacerlo de manera controlada y con un rango que se estimule correctamente.',
      series: 4,
      repeticiones: 12,
      tipo: 'Series efectivas, peso progresivo',
      imagenes: [
        require('../assets/abductor1.png'),
        require('../assets/abductor2.png'),
      ],
    },
  ],
};

function TrackerSeries({ totalSeries, repeticiones }) {
  const [completadas, setCompletadas] = useState([]);

  const toggleSerie = (index) => {
    setCompletadas(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const resetear = () => setCompletadas([]);
  const todasCompletas = completadas.length === totalSeries;

  return (
    <View style={styles.trackerContainer}>
      <View style={styles.trackerHeader}>
        <Text style={styles.trackerTitulo}>
          Series completadas{' '}
          <Text style={todasCompletas ? styles.trackerContadorFin : styles.trackerContador}>
            {completadas.length}/{totalSeries}
          </Text>
        </Text>
        {completadas.length > 0 && (
          <TouchableOpacity onPress={resetear}>
            <Text style={styles.trackerReset}>Reiniciar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.trackerFilas}>
        {Array.from({ length: totalSeries }).map((_, i) => {
          const hecha = completadas.includes(i);
          return (
            <TouchableOpacity
              key={i}
              style={[styles.serieBotón, hecha && styles.serieBotónHecho]}
              onPress={() => toggleSerie(i)}
              activeOpacity={0.7}
            >
              <Text style={[styles.serieNumero, hecha && styles.serieNumeroHecho]}>
                {hecha ? '✓' : i + 1}
              </Text>
              <Text style={[styles.serieReps, hecha && styles.serieRepsHecho]}>
                {repeticiones} reps
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {todasCompletas && (
        <View style={styles.trackerFeliz}>
          <Text style={styles.trackerFelizTexto}>¡Series completadas! 💪</Text>
        </View>
      )}
    </View>
  );
}

export default function EjerciciosScreen({ navigation, route }) {
  const { grupo } = route.params;
  const ejercicios = ejerciciosPorGrupo[grupo] || [];
  const [seleccionado, setSeleccionado] = useState(null);

  // Vista detalle
  if (seleccionado !== null) {
    const ej = ejercicios[seleccionado];
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.back} onPress={() => setSeleccionado(null)}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>{ej.nombre}</Text>

        {/* Animación entre imágenes */}
        {ej.imagenes && ej.imagenes.length === 2 && (
          <EjercicioAnimado imagenes={ej.imagenes} />
        )}

        {/* Series y Repeticiones */}
        {ej.series && (
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumero}>{ej.series}</Text>
              <Text style={styles.statLabel}>Series</Text>
            </View>
            <View style={styles.separador} />
            <View style={styles.statBox}>
              <Text style={styles.statNumero}>{ej.repeticiones}</Text>
              <Text style={styles.statLabel}>Repeticiones</Text>
            </View>
            <View style={styles.separador} />
            <View style={styles.statBox}>
              <Text style={styles.statTipo}>{ej.tipo}</Text>
            </View>
          </View>
        )}

        {/* Tracker de series */}
        {ej.series && (
          <TrackerSeries totalSeries={ej.series} repeticiones={ej.repeticiones} />
        )}

        {/* Descripción */}
        {ej.descripcion ? (
          <View style={styles.descripcionBox}>
            <Text style={styles.descripcionTitulo}>Descripción</Text>
            <Text style={styles.descripcionTexto}>{ej.descripcion}</Text>
          </View>
        ) : (
          <Text style={styles.vacio}>Información próximamente...</Text>
        )}
      </ScrollView>
    );
  }

  // Vista lista
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>{grupo}</Text>
      <Text style={styles.subtitulo}>{ejercicios.length} ejercicio(s)</Text>

      {ejercicios.length === 0 ? (
        <Text style={styles.vacio}>Próximamente...</Text>
      ) : (
        ejercicios.map((ej, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemCard}
            onPress={() => setSeleccionado(index)}
          >
            <Text style={styles.itemNombre}>{ej.nombre}</Text>
            <Text style={styles.itemArrow}>→</Text>
          </TouchableOpacity>
        ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  back: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  vacio: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 60,
  },

  // Lista
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  itemArrow: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },

  // Detalle — GIF
  gifContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 16,
  },
  gif: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumero: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  statTipo: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  separador: {
    width: 1,
    height: 40,
    backgroundColor: '#333',
  },

  // Tracker de series
  trackerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  trackerTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  trackerContador: {
    color: '#000',
  },
  trackerContadorFin: {
    color: '#22c55e',
  },
  trackerReset: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  trackerFilas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serieBotón: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  serieBotónHecho: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  serieNumero: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
  },
  serieNumeroHecho: {
    color: '#fff',
  },
  serieReps: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  serieRepsHecho: {
    color: '#aaa',
  },
  trackerFeliz: {
    marginTop: 14,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  trackerFelizTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Descripción
  descripcionBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  descripcionTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  descripcionTexto: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});
