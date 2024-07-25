import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>by camera</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Icon name="photo-camera" size={24} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.buttonText}>Abrir Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDA0DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
});
