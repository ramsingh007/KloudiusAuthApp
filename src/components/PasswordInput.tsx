import React, { useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function PasswordInput({
  value,
  onChangeText,
  placeholder,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!visible}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        onPress={() => setVisible(v => !v)}
        style={styles.iconWrapper}
        testID="password-toggle"

      >
        <Icon name={visible ? 'eye-slash' : 'eye'} size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  iconWrapper: {
    paddingLeft: 12,
  },
});
