import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

      {/* Botones top */}
      <TouchableOpacity style={styles.perfilBtn} onPress={() => navigation.navigate('Perfil')}>
        <Text style={styles.perfilBtnText}>👤</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rutinaBtn} onPress={() => navigation.navigate('Rutina')}>
        <Text style={styles.rutinaBtnText}>📋</Text>
      </TouchableOpacity>

      <Text style={styles.saludo}>Hola, {nombre || 'Atleta'} 👋</Text>
      <Text style={styles.subtitulo}>¿Qué vas a entrenar hoy?</Text>

      <View style={styles.opciones}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Inferior')}>
          <Image source={require('../assets/icon_inferior.png')} style={styles.cardIcon} resizeMode="contain" />
          <Text style={styles.cardText}>Inferior</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Superior')}>
          <Image source={require('../assets/icon_superior.png')} style={styles.cardIcon} resizeMode="contain" />
          <Text style={styles.cardText}>Superior</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingTop: 80 },
  perfilBtn: {
    position: 'absolute', top: 50, right: 30,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#000', justifyContent: 'center', alignItems: 'center',
  },
  perfilBtnText: { fontSize: 20 },
  rutinaBtn: {
    position: 'absolute', top: 50, right: 84,
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#000', justifyContent: 'center', alignItems: 'center',
  },
  rutinaBtnText: { fontSize: 20 },
  saludo: { fontSize: 28, fontWeight: '900', color: '#000', marginBottom: 6 },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 50 },
  opciones: { gap: 20 },
  card: {
    alignItems: 'center',
  },
  cardIcon: { width: 240, height: 240, marginBottom: 8 },
  cardText: { fontSize: 22, fontWeight: '900', color: '#000', letterSpacing: 2 },
});
