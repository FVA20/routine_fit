import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert
} from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function ProfileSetupScreen({ navigation, route }) {
  const fromGoogle = route.params?.fromGoogle ?? false;
  const googleName = route.params?.googleName ?? '';
  const googleLastName = route.params?.googleLastName ?? '';

  const [nombre, setNombre] = useState(googleName);
  const [apellidos, setApellidos] = useState(googleLastName);
  const [fechaNac, setFechaNac] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [imc, setImc] = useState(null);
  const [pesoMeta, setPesoMeta] = useState('');
  const [genero, setGenero] = useState('');
  const [loading, setLoading] = useState(false);

  // Filtrar solo letras y espacios (para nombre y apellidos)
  const soloLetras = (texto) => texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');

  // Filtrar solo números y un punto decimal (para peso, talla, peso meta)
  const soloDecimal = (texto) => {
    const limpio = texto.replace(/[^0-9.]/g, '');
    const partes = limpio.split('.');
    if (partes.length > 2) return partes[0] + '.' + partes.slice(1).join('');
    return limpio;
  };

  // Calcular IMC automáticamente cuando cambian peso o talla
  useEffect(() => {
    const p = parseFloat(peso);
    const t = parseFloat(talla) / 100;
    if (p > 0 && t > 0) {
      setImc((p / (t * t)).toFixed(1));
    } else {
      setImc(null);
    }
  }, [peso, talla]);

  // Calcular edad desde fecha de nacimiento (DD/MM/YYYY)
  const calcularEdad = (texto) => {
    // Solo permitir números
    const soloNumeros = texto.replace(/[^0-9]/g, '');

    // Formatear automáticamente con /
    let formateado = '';
    if (soloNumeros.length <= 2) {
      formateado = soloNumeros;
    } else if (soloNumeros.length <= 4) {
      formateado = soloNumeros.slice(0, 2) + '/' + soloNumeros.slice(2);
    } else {
      formateado = soloNumeros.slice(0, 2) + '/' + soloNumeros.slice(2, 4) + '/' + soloNumeros.slice(4, 8);
    }

    setFechaNac(formateado);

    if (formateado.length === 10) {
      const partes = formateado.split('/');
      if (partes.length === 3) {
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1;
        const anio = parseInt(partes[2]);
        const nacimiento = new Date(anio, mes, dia);
        const hoy = new Date();
        let años = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) años--;
        if (años > 0 && años < 120) setEdad(String(años));
      }
    } else {
      setEdad('');
    }
  };

  const imcCategoria = () => {
    if (!imc) return '';
    const v = parseFloat(imc);
    if (v < 18.5) return 'Bajo peso';
    if (v < 25) return 'Normal';
    if (v < 30) return 'Sobrepeso';
    return 'Obesidad';
  };

  const handleGuardar = async () => {
    if (!nombre || !apellidos || !fechaNac || !edad || !peso || !talla || !pesoMeta || !genero) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos');
      return;
    }

    // Validar nombre y apellidos
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre.trim())) {
      Alert.alert('Error', 'El nombre solo puede contener letras');
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(apellidos.trim())) {
      Alert.alert('Error', 'Los apellidos solo pueden contener letras');
      return;
    }

    // Validar fecha real
    const partesFecha = fechaNac.split('/');
    if (partesFecha.length === 3) {
      const dia = parseInt(partesFecha[0]);
      const mes = parseInt(partesFecha[1]) - 1;
      const anio = parseInt(partesFecha[2]);
      const fechaObj = new Date(anio, mes, dia);
      if (
        fechaObj.getDate() !== dia ||
        fechaObj.getMonth() !== mes ||
        fechaObj.getFullYear() !== anio ||
        fechaObj >= new Date()
      ) {
        Alert.alert('Error', 'Ingresa una fecha de nacimiento válida');
        return;
      }
    }

    // Validar rangos numéricos
    const pesoNum = parseFloat(peso);
    const tallaNum = parseFloat(talla);
    const pesoMetaNum = parseFloat(pesoMeta);

    if (isNaN(pesoNum) || pesoNum < 20 || pesoNum > 300) {
      Alert.alert('Error', 'Ingresa un peso válido (entre 20 y 300 kg)');
      return;
    }
    if (isNaN(tallaNum) || tallaNum < 50 || tallaNum > 250) {
      Alert.alert('Error', 'Ingresa una talla válida (entre 50 y 250 cm)');
      return;
    }
    if (isNaN(pesoMetaNum) || pesoMetaNum < 20 || pesoMetaNum > 300) {
      Alert.alert('Error', 'Ingresa un peso meta válido (entre 20 y 300 kg)');
      return;
    }
    setLoading(true);
    try {
      const uid = auth.currentUser.uid;
      await setDoc(doc(db, 'usuarios', uid), {
        nombre,
        apellidos,
        fechaNacimiento: fechaNac,
        edad: parseInt(edad),
        peso: parseFloat(peso),
        talla: parseFloat(talla),
        imc: parseFloat(imc),
        pesoMeta: parseFloat(pesoMeta),
        genero,
        creadoEn: new Date(),
      });
      Alert.alert('¡Registro exitoso!', `Bienvenido/a, ${nombre}. Tu perfil ha sido creado.`, [
        { text: 'Continuar', onPress: () => navigation.replace('Questionnaire') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

      <Text style={styles.title}>Tu perfil</Text>
      <Text style={styles.subtitle}>Cuéntanos sobre ti para personalizar tu experiencia</Text>

      {/* Nombre y Apellidos */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={[styles.input, fromGoogle && styles.inputReadonly]}
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={nombre}
        onChangeText={(t) => setNombre(soloLetras(t))}
        editable={!fromGoogle}
      />

      <Text style={styles.label}>Apellidos</Text>
      <TextInput
        style={[styles.input, fromGoogle && styles.inputReadonly]}
        placeholder="Apellidos"
        placeholderTextColor="#999"
        value={apellidos}
        onChangeText={(t) => setApellidos(soloLetras(t))}
        editable={!fromGoogle}
      />
      {fromGoogle && (
        <Text style={styles.syncNote}>Sincronizado con tu cuenta de Google</Text>
      )}

      {/* Fecha de nacimiento y edad */}
      <Text style={styles.label}>Fecha de nacimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#999"
        value={fechaNac}
        onChangeText={calcularEdad}
        keyboardType="numeric"
        maxLength={10}
      />

      <Text style={styles.label}>Edad</Text>
      <View style={styles.inputReadonlyBox}>
        <Text style={styles.inputReadonlyText}>
          {edad ? `${edad} años` : 'Se calcula con tu fecha de nacimiento'}
        </Text>
      </View>

      {/* Peso y Talla */}
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 70"
            placeholderTextColor="#999"
            value={peso}
            onChangeText={(t) => setPeso(soloDecimal(t))}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.half}>
          <Text style={styles.label}>Talla (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 175"
            placeholderTextColor="#999"
            value={talla}
            onChangeText={(t) => setTalla(soloDecimal(t))}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      {/* IMC */}
      <Text style={styles.label}>IMC (Índice de Masa Corporal)</Text>
      <View style={[styles.inputReadonlyBox, imc && styles.imcBox]}>
        <Text style={styles.inputReadonlyText}>
          {imc ? `${imc} — ${imcCategoria()}` : 'Se calcula con peso y talla'}
        </Text>
      </View>

      {/* Peso meta */}
      <Text style={styles.label}>Peso que deseas lograr (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 65"
        placeholderTextColor="#999"
        value={pesoMeta}
        onChangeText={(t) => setPesoMeta(soloDecimal(t))}
        keyboardType="decimal-pad"
      />

      {/* Género */}
      <Text style={styles.label}>Género</Text>
      <View style={styles.generoRow}>
        <TouchableOpacity
          style={[styles.generoBtn, genero === 'Masculino' && styles.generoBtnActive]}
          onPress={() => setGenero('Masculino')}
        >
          <Text style={[styles.generoBtnText, genero === 'Masculino' && styles.generoBtnTextActive]}>
            Masculino
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.generoBtn, genero === 'Femenino' && styles.generoBtnActive]}
          onPress={() => setGenero('Femenino')}
        >
          <Text style={[styles.generoBtnText, genero === 'Femenino' && styles.generoBtnTextActive]}>
            Femenino
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botón guardar */}
      <TouchableOpacity style={styles.btnPrimary} onPress={handleGuardar} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnPrimaryText}>Continuar</Text>
        }
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { paddingHorizontal: 30, paddingTop: 60, paddingBottom: 50 },
  title: { fontSize: 30, fontWeight: '900', color: '#000', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 30 },
  label: { fontSize: 14, fontWeight: '700', color: '#000', marginBottom: 6, marginTop: 16 },
  input: {
    borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 18, fontSize: 16, color: '#000',
  },
  inputReadonly: { borderColor: '#ccc', color: '#555', backgroundColor: '#f9f9f9' },
  inputReadonlyBox: {
    borderWidth: 1.5, borderColor: '#ddd', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 18, backgroundColor: '#f9f9f9',
  },
  inputReadonlyText: { fontSize: 16, color: '#555' },
  imcBox: { borderColor: '#000', backgroundColor: '#f0f0f0' },
  syncNote: { fontSize: 12, color: '#888', marginTop: 4 },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  generoRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  generoBtn: {
    flex: 1, borderWidth: 1.5, borderColor: '#000', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  generoBtnActive: { backgroundColor: '#000' },
  generoBtnText: { fontSize: 16, fontWeight: '600', color: '#000' },
  generoBtnTextActive: { color: '#fff' },
  btnPrimary: {
    backgroundColor: '#000', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 30,
  },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
});
