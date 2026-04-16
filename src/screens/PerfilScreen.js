import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  ActivityIndicator, Alert, Image, TextInput, Modal,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../config/firebase';

export default function PerfilScreen({ navigation }) {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subiendoFoto, setSubiendoFoto] = useState(false);

  // Progreso
  const [historial, setHistorial] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoPeso, setNuevoPeso] = useState('');
  const [nuevaTalla, setNuevaTalla] = useState('');
  const [nuevasNotas, setNuevasNotas] = useState('');
  const [guardando, setGuardando] = useState(false);

  const uid = auth.currentUser?.uid;

  const cargarDatos = useCallback(async () => {
    if (!uid) return;
    try {
      const snap = await getDoc(doc(db, 'usuarios', uid));
      if (snap.exists()) setPerfil(snap.data());

      const q = query(collection(db, 'usuarios', uid, 'progreso'), orderBy('creadoEn', 'desc'));
      const snapProg = await getDocs(q);
      const entradas = snapProg.docs.map(d => ({ id: d.id, ...d.data() }));
      setHistorial(entradas);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar el perfil.');
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  // ── Foto de perfil ──────────────────────────────────────────────
  const handleCambiarFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para cambiar la foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (result.canceled) return;

    setSubiendoFoto(true);
    try {
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `fotos_perfil/${uid}`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'usuarios', uid), { fotoPerfil: url });
      setPerfil(prev => ({ ...prev, fotoPerfil: url }));
    } catch (e) {
      Alert.alert('Error', 'No se pudo subir la foto. Intenta de nuevo.');
    } finally {
      setSubiendoFoto(false);
    }
  };

  // ── Guardar nueva entrada de progreso ───────────────────────────
  const handleGuardarProgreso = async () => {
    const pesoNum = parseFloat(nuevoPeso);
    if (!nuevoPeso || isNaN(pesoNum) || pesoNum < 20 || pesoNum > 300) {
      Alert.alert('Error', 'Ingresa un peso válido (entre 20 y 300 kg)');
      return;
    }
    let tallaNum = null;
    if (nuevaTalla) {
      tallaNum = parseFloat(nuevaTalla);
      if (isNaN(tallaNum) || tallaNum < 50 || tallaNum > 250) {
        Alert.alert('Error', 'Ingresa una talla válida (entre 50 y 250 cm)');
        return;
      }
    }

    setGuardando(true);
    try {
      const imc = tallaNum ? parseFloat((pesoNum / ((tallaNum / 100) ** 2)).toFixed(1)) : null;
      const fecha = new Date();
      const entrada = {
        peso: pesoNum,
        talla: tallaNum,
        imc,
        notas: nuevasNotas.trim() || null,
        creadoEn: fecha,
        fechaTexto: fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }),
      };
      const docRef = await addDoc(collection(db, 'usuarios', uid, 'progreso'), entrada);
      setHistorial(prev => [{ id: docRef.id, ...entrada }, ...prev]);
      setModalVisible(false);
      setNuevoPeso('');
      setNuevaTalla('');
      setNuevasNotas('');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar. Intenta de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  // ── Cerrar sesión ────────────────────────────────────────────────
  const handleCerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión', style: 'destructive',
        onPress: async () => { await signOut(auth); navigation.replace('Login'); },
      },
    ]);
  };

  // ── Helpers ──────────────────────────────────────────────────────
  const imcCategoria = (v) => {
    if (!v) return '';
    if (v < 18.5) return 'Bajo peso';
    if (v < 25) return 'Normal';
    if (v < 30) return 'Sobrepeso';
    return 'Obesidad';
  };

  const iniciales = () => {
    const n = perfil?.nombre?.charAt(0)?.toUpperCase() || '';
    const a = perfil?.apellidos?.charAt(0)?.toUpperCase() || '';
    return n + a;
  };

  const diferenciaPeso = (index) => {
    if (index >= historial.length - 1) return null;
    const diff = historial[index].peso - historial[index + 1].peso;
    return diff;
  };

  // ── Loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!perfil) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontró el perfil.</Text>
      </View>
    );
  }

  // ── Datos para la mini gráfica (últimas 6 entradas, del más viejo al más nuevo) ──
  const datosGrafica = [...historial].reverse().slice(-6);
  const pesoMax = datosGrafica.length ? Math.max(...datosGrafica.map(e => e.peso)) : 1;
  const pesoMin = datosGrafica.length ? Math.min(...datosGrafica.map(e => e.peso)) : 0;
  const rango = pesoMax - pesoMin || 1;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>

      {/* Header */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleCambiarFoto} disabled={subiendoFoto}>
          <View style={styles.avatarWrapper}>
            {perfil.fotoPerfil ? (
              <Image source={{ uri: perfil.fotoPerfil }} style={styles.avatarImg} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{iniciales()}</Text>
              </View>
            )}
            <View style={styles.camaraTag}>
              {subiendoFoto
                ? <ActivityIndicator size="small" color="#fff" />
                : <Text style={styles.camaraIcon}>📷</Text>}
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.nombreCompleto}>{perfil.nombre} {perfil.apellidos}</Text>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
      </View>

      {/* Datos personales */}
      <Text style={styles.seccion}>DATOS PERSONALES</Text>
      <View style={styles.card}>
        <Fila label="Nombre" valor={perfil.nombre} />
        <Divider />
        <Fila label="Apellidos" valor={perfil.apellidos} />
        <Divider />
        <Fila label="Fecha de nacimiento" valor={perfil.fechaNacimiento} />
        <Divider />
        <Fila label="Edad" valor={`${perfil.edad} años`} />
        <Divider />
        <Fila label="Género" valor={perfil.genero} />
      </View>

      {/* Datos físicos */}
      <Text style={styles.seccion}>DATOS FÍSICOS</Text>
      <View style={styles.statsGrid}>
        <StatBox label="Peso" valor={`${perfil.peso}`} unidad="kg" />
        <StatBox label="Talla" valor={`${perfil.talla}`} unidad="cm" />
        <StatBox label="IMC" valor={`${perfil.imc}`} unidad={imcCategoria(perfil.imc)} destacado />
        <StatBox label="Peso meta" valor={`${perfil.pesoMeta}`} unidad="kg" />
      </View>

      {/* Seguimiento de progreso */}
      <View style={styles.progresoHeader}>
        <Text style={styles.seccion}>MI PROGRESO</Text>
        <TouchableOpacity style={styles.btnAgregar} onPress={() => setModalVisible(true)}>
          <Text style={styles.btnAgregarText}>+ Registrar</Text>
        </TouchableOpacity>
      </View>

      {historial.length === 0 ? (
        <View style={styles.sinProgreso}>
          <Text style={styles.sinProgresoTexto}>Aún no tienes registros.</Text>
          <Text style={styles.sinProgresoSub}>Registra tu primer medición para comenzar el seguimiento.</Text>
        </View>
      ) : (
        <>
          {/* Mini gráfica */}
          {datosGrafica.length >= 2 && (
            <View style={styles.graficaContainer}>
              <Text style={styles.graficaTitulo}>Peso (kg) — últimos {datosGrafica.length} registros</Text>
              <View style={styles.grafica}>
                {datosGrafica.map((entry, i) => {
                  const altura = ((entry.peso - pesoMin) / rango) * 80 + 10;
                  return (
                    <View key={entry.id} style={styles.graficaCol}>
                      <Text style={styles.graficaValor}>{entry.peso}</Text>
                      <View style={[styles.graficaBarra, { height: altura }]} />
                      <Text style={styles.graficaFecha} numberOfLines={1}>
                        {entry.fechaTexto?.split(' ').slice(0, 2).join(' ')}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Historial */}
          {historial.map((entry, index) => {
            const diff = diferenciaPeso(index);
            return (
              <View key={entry.id} style={styles.entradaCard}>
                <View style={styles.entradaTop}>
                  <Text style={styles.entradaFecha}>{entry.fechaTexto}</Text>
                  {diff !== null && (
                    <View style={[styles.diffTag, diff < 0 ? styles.diffBaja : diff > 0 ? styles.diffSube : styles.diffIgual]}>
                      <Text style={diff < 0 ? styles.diffTexto : styles.diffTextoOscuro}>
                        {diff < 0 ? `▼ ${Math.abs(diff).toFixed(1)} kg` : diff > 0 ? `▲ ${diff.toFixed(1)} kg` : '= sin cambio'}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={styles.entradaStats}>
                  <View style={styles.entradaStat}>
                    <Text style={styles.entradaStatVal}>{entry.peso}</Text>
                    <Text style={styles.entradaStatLabel}>kg</Text>
                  </View>
                  {entry.talla && (
                    <View style={styles.entradaStat}>
                      <Text style={styles.entradaStatVal}>{entry.talla}</Text>
                      <Text style={styles.entradaStatLabel}>cm</Text>
                    </View>
                  )}
                  {entry.imc && (
                    <View style={styles.entradaStat}>
                      <Text style={styles.entradaStatVal}>{entry.imc}</Text>
                      <Text style={styles.entradaStatLabel}>IMC</Text>
                    </View>
                  )}
                </View>
                {entry.notas ? <Text style={styles.entradaNotas}>"{entry.notas}"</Text> : null}
              </View>
            );
          })}
        </>
      )}

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.btnCerrar} onPress={handleCerrarSesion}>
        <Text style={styles.btnCerrarText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Modal nuevo registro */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Nuevo registro</Text>
            <Text style={styles.modalSub}>Registra tus medidas actuales</Text>

            <Text style={styles.modalLabel}>Peso actual (kg) *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ej: 70.5"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={nuevoPeso}
              onChangeText={setNuevoPeso}
            />

            <Text style={styles.modalLabel}>Talla (cm) — opcional</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ej: 175"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={nuevaTalla}
              onChangeText={setNuevaTalla}
            />

            <Text style={styles.modalLabel}>Notas — opcional</Text>
            <TextInput
              style={[styles.modalInput, styles.modalInputMulti]}
              placeholder="Cómo te sientes, cambios notados..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              value={nuevasNotas}
              onChangeText={setNuevasNotas}
            />

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.modalBtnCancelar}
                onPress={() => { setModalVisible(false); setNuevoPeso(''); setNuevaTalla(''); setNuevasNotas(''); }}
              >
                <Text style={styles.modalBtnCancelarText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnGuardar} onPress={handleGuardarProgreso} disabled={guardando}>
                {guardando
                  ? <ActivityIndicator color="#fff" />
                  : <Text style={styles.modalBtnGuardarText}>Guardar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </ScrollView>
  );
}

function Fila({ label, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.filaLabel}>{label}</Text>
      <Text style={styles.filaValor}>{valor}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function StatBox({ label, valor, unidad, destacado }) {
  return (
    <View style={[styles.statBox, destacado && styles.statBoxDestacado]}>
      <Text style={[styles.statLabel, destacado && styles.statLabelD]}>{label}</Text>
      <Text style={[styles.statValor, destacado && styles.statValorD]}>{valor}</Text>
      <Text style={[styles.statUnidad, destacado && styles.statUnidadD]}>{unidad}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 60 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  errorText: { fontSize: 16, color: '#666' },

  backBtn: { marginBottom: 20 },
  backArrow: { fontSize: 28, color: '#000', fontWeight: '300' },

  // Avatar
  avatarContainer: { alignItems: 'center', marginBottom: 36 },
  avatarWrapper: { position: 'relative', marginBottom: 14 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#000', justifyContent: 'center', alignItems: 'center',
  },
  avatarImg: { width: 90, height: 90, borderRadius: 45 },
  avatarText: { fontSize: 32, fontWeight: '900', color: '#fff' },
  camaraTag: {
    position: 'absolute', bottom: 0, right: 0,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#000', borderWidth: 2, borderColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  camaraIcon: { fontSize: 13 },
  nombreCompleto: { fontSize: 22, fontWeight: '900', color: '#000', marginBottom: 4 },
  email: { fontSize: 14, color: '#888' },

  // Secciones
  seccion: { fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 1.5, marginBottom: 12, marginTop: 4 },

  // Card datos personales
  card: { borderWidth: 1.5, borderColor: '#000', borderRadius: 16, paddingHorizontal: 20, marginBottom: 28 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
  filaLabel: { fontSize: 15, color: '#666', fontWeight: '500' },
  filaValor: { fontSize: 15, fontWeight: '700', color: '#000' },
  divider: { height: 1, backgroundColor: '#f0f0f0' },

  // Stats grid
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  statBox: { width: '47%', borderWidth: 1.5, borderColor: '#000', borderRadius: 16, paddingVertical: 20, paddingHorizontal: 16, alignItems: 'center' },
  statBoxDestacado: { backgroundColor: '#000' },
  statLabel: { fontSize: 11, fontWeight: '700', color: '#888', letterSpacing: 1, marginBottom: 6 },
  statLabelD: { color: '#aaa' },
  statValor: { fontSize: 26, fontWeight: '900', color: '#000', marginBottom: 2 },
  statValorD: { color: '#fff' },
  statUnidad: { fontSize: 12, color: '#888', fontWeight: '500' },
  statUnidadD: { color: '#ccc' },

  // Progreso header
  progresoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  btnAgregar: { backgroundColor: '#000', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  btnAgregarText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  // Sin progreso
  sinProgreso: { borderWidth: 1.5, borderColor: '#ddd', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 28 },
  sinProgresoTexto: { fontSize: 15, fontWeight: '700', color: '#000', marginBottom: 6 },
  sinProgresoSub: { fontSize: 13, color: '#888', textAlign: 'center' },

  // Mini gráfica
  graficaContainer: { borderWidth: 1.5, borderColor: '#000', borderRadius: 16, padding: 16, marginBottom: 16 },
  graficaTitulo: { fontSize: 12, fontWeight: '700', color: '#666', letterSpacing: 0.5, marginBottom: 12 },
  grafica: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 120 },
  graficaCol: { alignItems: 'center', flex: 1 },
  graficaValor: { fontSize: 10, fontWeight: '700', color: '#000', marginBottom: 4 },
  graficaBarra: { width: 28, backgroundColor: '#000', borderRadius: 6 },
  graficaFecha: { fontSize: 9, color: '#888', marginTop: 6, textAlign: 'center' },

  // Entradas de historial
  entradaCard: {
    borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 16,
    padding: 16, marginBottom: 12,
  },
  entradaTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  entradaFecha: { fontSize: 13, fontWeight: '700', color: '#000' },
  diffTag: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  diffBaja: { backgroundColor: '#000' },
  diffSube: { backgroundColor: '#e0e0e0' },
  diffIgual: { backgroundColor: '#f5f5f5' },
  diffTexto: { fontSize: 11, fontWeight: '700', color: '#fff' },
  diffTextoOscuro: { fontSize: 11, fontWeight: '700', color: '#000' },
  entradaStats: { flexDirection: 'row', gap: 20 },
  entradaStat: { alignItems: 'center' },
  entradaStatVal: { fontSize: 22, fontWeight: '900', color: '#000' },
  entradaStatLabel: { fontSize: 11, color: '#888', fontWeight: '600' },
  entradaNotas: { fontSize: 13, color: '#666', fontStyle: 'italic', marginTop: 10 },

  // Cerrar sesión
  btnCerrar: { borderWidth: 1.5, borderColor: '#000', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 12 },
  btnCerrarText: { fontSize: 15, fontWeight: '700', color: '#000' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 28, paddingBottom: 40,
  },
  modalTitulo: { fontSize: 22, fontWeight: '900', color: '#000', marginBottom: 4 },
  modalSub: { fontSize: 14, color: '#888', marginBottom: 24 },
  modalLabel: { fontSize: 13, fontWeight: '700', color: '#000', marginBottom: 6, marginTop: 14 },
  modalInput: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 18, fontSize: 16, color: '#000',
  },
  modalInputMulti: { height: 80, textAlignVertical: 'top' },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 24 },
  modalBtnCancelar: {
    flex: 1, borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  modalBtnCancelarText: { fontSize: 15, fontWeight: '700', color: '#000' },
  modalBtnGuardar: {
    flex: 1, backgroundColor: '#000', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  modalBtnGuardarText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
