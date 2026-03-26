import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function HomeScreen({ navigation }) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const cargarNombre = async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const perfil = await getDoc(doc(db, 'usuarios', uid));
        if (perfil.exists()) setNombre(perfil.data().nombre);
      }
    };
    cargarNombre();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>Hola, {nombre || 'Atleta'} 👋</Text>
      <Text style={styles.subtitulo}>¿Qué vas a entrenar hoy?</Text>

      <View style={styles.opciones}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Inferior')}>
          <Text style={styles.cardEmoji}>🦵</Text>
          <Text style={styles.cardText}>Inferior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Superior')}>
          <Text style={styles.cardEmoji}>💪</Text>
          <Text style={styles.cardText}>Superior</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingTop: 80 },
  saludo: { fontSize: 28, fontWeight: '900', color: '#000', marginBottom: 6 },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 50 },
  opciones: { gap: 20 },
  card: {
    borderWidth: 2, borderColor: '#000', borderRadius: 20,
    paddingVertical: 50, alignItems: 'center',
  },
  cardEmoji: { fontSize: 52, marginBottom: 12 },
  cardText: { fontSize: 22, fontWeight: '900', color: '#000', letterSpacing: 2 },
});
