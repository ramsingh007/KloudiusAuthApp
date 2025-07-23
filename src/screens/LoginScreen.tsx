import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import PasswordInput from '../components/PasswordInput';

export default function LoginScreen({ navigation }: any) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => login(email.trim(), password);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Signup')}>
        <Text style={styles.linkText}>
          Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#bf1e2e',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  linkText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
