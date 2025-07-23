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

export default function SignupScreen({ navigation }: any) {
  const { signup, error: authError } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [localError, setLocalError] = useState('');

  const validateEmail = (email: string) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const handleSignup = () => {
    if (!name || !email || !password) {
      return setLocalError('Missing fields.');
    }
    if (!validateEmail(email)) {
      return setLocalError('Invalid email format.');
    }
    if (password.length < 6) {
      return setLocalError('Password must be at least 6 characters.');
    }

    setLocalError('');
    signup(name.trim(), email.trim(), password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        style={styles.input}
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {(localError || authError) ? (
        <Text style={styles.error}>{localError || authError}</Text>
      ) : null}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.linkHighlight}>Login</Text>
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
    fontSize: 16,
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#bf1e2e',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  signupText: {
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
