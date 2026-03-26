import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

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
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
    {
      nombre: 'Peso Muerto Rumano',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
  ],
  'Glúteos': [
    {
      nombre: 'Búlgaras',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
    {
      nombre: 'Hip Thrust',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
    {
      nombre: 'Patada en Polea',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
  ],
  'Pantorrillas': [
    {
      nombre: 'Elevación de Pantorrillas de Pie en Máquina Smith',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
    {
      nombre: 'Extensión de Gemelos en Máquina',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
  ],
  'Aductores': [
    {
      nombre: 'Máquina de Aductores',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
  ],
  'Abductores': [
    {
      nombre: 'Máquina de Abductores',
      descripcion: '',
      series: null,
      repeticiones: null,
      tipo: '',
      imagenes: [],
    },
  ],
};

export default function EjerciciosScreen({ navigation, route }) {
  const { grupo } = route.params;
  const ejercicios = ejerciciosPorGrupo[grupo] || [];
  const [seleccionado, setSeleccionado] = useState(null);

  // Vista detalle
  if (seleccionado !== null) {
    const ej = ejercicios[seleccionado];
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.back} onPress={() => setSeleccionado(null)}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>{ej.nombre}</Text>

        {/* Imágenes lado a lado */}
        {ej.imagenes.length === 2 && (
          <View style={styles.imagenesRow}>
            <Image source={ej.imagenes[0]} style={styles.imagen} resizeMode="contain" />
            <Image source={ej.imagenes[1]} style={styles.imagen} resizeMode="contain" />
          </View>
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

        {/* Descripción */}
        {ej.descripcion ? (
          <View style={styles.descripcionBox}>
            <Text style={styles.descripcionTitulo}>Descripción</Text>
            <Text style={styles.descripcionTexto}>{ej.descripcion}</Text>
          </View>
        ) : (
          <Text style={styles.vacio}>Información próximamente...</Text>
        )}

        <View style={{ height: 40 }} />
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

  // Detalle — Imágenes
  imagenesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 16,
  },
  imagen: {
    width: '48%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#eee',
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
