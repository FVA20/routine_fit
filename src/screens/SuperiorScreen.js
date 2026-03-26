import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const grupos = [
  { nombre: 'Pecho', emoji: '💪' },
  { nombre: 'Espalda', emoji: '🏋️' },
  { nombre: 'Hombros', emoji: '🔝' },
  { nombre: 'Bíceps', emoji: '💪' },
  { nombre: 'Tríceps', emoji: '💪' },
  { nombre: 'Antebrazos', emoji: '🦾' },
];

export default function SuperiorScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>💪 Superior</Text>
      <Text style={styles.subtitulo}>Selecciona el grupo muscular</Text>

      <View style={styles.lista}>
        {grupos.map((g) => (
          <TouchableOpacity
            key={g.nombre}
            style={styles.card}
            onPress={() => navigation.navigate('Ejercicios', { grupo: g.nombre })}
          >
            <Text style={styles.cardEmoji}>{g.emoji}</Text>
            <Text style={styles.cardText}>{g.nombre}</Text>
            <Text style={styles.cardArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 30, paddingTop: 70, paddingBottom: 40 },
  back: { marginBottom: 24 },
  backText: { fontSize: 16, fontWeight: '600', color: '#000' },
  titulo: { fontSize: 30, fontWeight: '900', color: '#000', marginBottom: 6 },
  subtitulo: { fontSize: 15, color: '#666', marginBottom: 30 },
  lista: { gap: 14 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 2, borderColor: '#000', borderRadius: 16,
    paddingVertical: 18, paddingHorizontal: 20,
  },
  cardEmoji: { fontSize: 26, marginRight: 14 },
  cardText: { flex: 1, fontSize: 18, fontWeight: '700', color: '#000' },
  cardArrow: { fontSize: 18, color: '#000' },
});
