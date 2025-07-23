import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:16 }}>
      <Text style={{ fontSize:20, marginBottom:8 }}>Welcome, {user.name}!</Text>
      <Text style={{ marginBottom:24 }}>{user.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
