import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Alert, ScrollView
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => {
    Alert.alert('Próximamente', 'El registro con Google estará disponible en la versión final de la app.');
  };

  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('ProfileSetup', { fromGoogle: false });
    } catch (error) {
      const codigo = error.code;
      let mensaje = 'No se pudo crear la cuenta.';
      if (codigo === 'auth/email-already-in-use') mensaje = 'Este correo ya está registrado.';
      else if (codigo === 'auth/invalid-email') mensaje = 'El correo no es válido.';
      else if (codigo === 'auth/weak-password') mensaje = 'La contraseña es muy débil.';
      else if (codigo === 'auth/network-request-failed') mensaje = 'Sin conexión a internet.';
      else mensaje = `Error: ${codigo}`;
      Alert.alert('Error', mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Únete a RoutineFit</Text>

        {/* Google primero */}
        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={handleGoogle}
        >
          <Text style={styles.btnGoogleText}>🔵  Continuar con Google</Text>
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>o crea una cuenta</Text>
          <View style={styles.line} />
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#999"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnPrimaryText}>Registrarme</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>¿Ya tienes cuenta? <Text style={styles.loginLinkBold}>Inicia sesión</Text></Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flexGrow: 1, paddingHorizontal: 30, paddingTop: 60, paddingBottom: 40 },
  backBtn: { marginBottom: 30 },
  backText: { fontSize: 16, color: '#000', fontWeight: '600' },
  title: { fontSize: 32, fontWeight: '900', color: '#000', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  btnGoogle: {
    borderWidth: 1.5, borderColor: '#ddd', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', backgroundColor: '#fff', marginBottom: 24,
  },
  btnGoogleText: { fontSize: 16, fontWeight: '600', color: '#000' },
  separator: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  separatorText: { marginHorizontal: 10, color: '#999', fontSize: 13 },
  form: { gap: 16 },
  input: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 18, fontSize: 16, color: '#000',
  },
  btnPrimary: {
    backgroundColor: '#000', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  loginLink: { textAlign: 'center', color: '#666', fontSize: 14, marginTop: 8 },
  loginLinkBold: { color: '#000', fontWeight: '700' },
});
