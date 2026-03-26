import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Alert, Image
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = () => {
    Alert.alert('Próximamente', 'El inicio con Google estará disponible en la versión final de la app.');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      const credencial = await signInWithEmailAndPassword(auth, email, password);
      const uid = credencial.user.uid;
      const perfil = await getDoc(doc(db, 'usuarios', uid));
      if (perfil.exists() && perfil.data().perfilCompleto) {
        navigation.replace('Home');
      } else if (perfil.exists()) {
        navigation.replace('Questionnaire');
      } else {
        navigation.replace('ProfileSetup', { fromGoogle: false });
      }
    } catch (error) {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/ROUTINEFIT_LOGO.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>ROUTINEFIT</Text>
          <Text style={styles.slogan}>Tu rutina, tu resultado</Text>
        </View>

        {/* Inputs */}
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

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnPrimaryText}>Iniciar Sesión</Text>
            }
          </TouchableOpacity>

          {/* Separador */}
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>o</Text>
            <View style={styles.line} />
          </View>

          {/* Google */}
          <TouchableOpacity
            style={styles.btnGoogle}
            onPress={handleGoogle}
          >
            <Text style={styles.btnGoogleText}>🔵  Continuar con Google</Text>
          </TouchableOpacity>

          {/* Ir a Registro */}
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate</Text></Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoImage: { width: 220, height: 120 },
  logoText: { fontSize: 28, fontWeight: '900', color: '#000', letterSpacing: 4, marginTop: 8 },
  slogan: { fontSize: 14, color: '#666', marginTop: 6, letterSpacing: 1 },
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
  separator: { flexDirection: 'row', alignItems: 'center' },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  separatorText: { marginHorizontal: 12, color: '#999', fontSize: 14 },
  btnGoogle: {
    borderWidth: 1.5, borderColor: '#ddd', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', backgroundColor: '#fff',
  },
  btnGoogleText: { fontSize: 16, fontWeight: '600', color: '#000' },
  registerLink: { textAlign: 'center', color: '#666', fontSize: 14 },
  registerLinkBold: { color: '#000', fontWeight: '700' },
});
