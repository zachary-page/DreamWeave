import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DreamRecordingScreen = ({ navigation }) => {
  const [dreamText, setDreamText] = useState('');

  const handleSaveDream = () => {
    // TODO: Implement API call to save the dream
    console.log('Saving dream:', dreamText);
    // Navigate back to HomeScreen after saving
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Your Dream</Text>
      <TextInput 
        style={styles.input} 
        multiline 
        placeholder="Enter your dream here..." 
        value={dreamText} 
        onChangeText={setDreamText} 
      />
      <Button title="Save Dream" onPress={handleSaveDream} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    height: 200, 
    textAlignVertical: 'top', 
    borderRadius: 5, 
  },
  button: {
    backgroundColor: '#4CAF50', 
    padding: 10,
    borderRadius: 5,
  },
});

export default DreamRecordingScreen;