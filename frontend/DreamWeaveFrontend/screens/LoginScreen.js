import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
// Import AsyncStorage (or your preferred secure storage library)
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-backend-api-url/login', { 
        usernameOrEmail, 
        password 
      });

      // Store JWT token in AsyncStorage
      await AsyncStorage.setItem('jwtToken', response.data.token); 

      navigation.navigate('Home'); 
    } catch (error) {
      Alert.alert('Login Error', error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username or Email" 
        value={usernameOrEmail} 
        onChangeText={setUsernameOrEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    justifyContent: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
});

export default LoginScreen;