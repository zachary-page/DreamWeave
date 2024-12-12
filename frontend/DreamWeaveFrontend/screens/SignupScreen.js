import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // TODO: Implement signup logic here
    console.log('Signup with:', username, email, password);
    // Navigate to Login Screen or Home Screen after successful signup
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <Button title="Signup" onPress={handleSignup} style={styles.button} />
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
    textAlign: 'center', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5, 
  },
  button: {
    backgroundColor: '#4CAF50', 
    padding: 10,
    borderRadius: 5,
  },
});

export default SignupScreen;