import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [tipo, setTipo] = useState(CameraType.back);
  const [permissao, solicitarPermissao] = Camera.useCameraPermissions();
  const [foto, setFoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (permissao && !permissao.granted) {
      solicitarPermissao();
    }
  }, [permissao]);

  if (!permissao) {
    
    return <View />;
  }

  if (!permissao.granted) {
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Precisamos da sua permissão para mostrar a câmera</Text>
        <TouchableOpacity onPress={solicitarPermissao} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function alternarTipoDeCâmera() {
    setTipo(tipoAtual => 
      tipoAtual === CameraType.back 
        ? CameraType.front 
        : CameraType.back
    );
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setFoto(uri);
    }
  }

  function voltarParaCamera() {
    setFoto(null);
  }

  return (
    <View style={styles.container}>
      {foto ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: foto }} style={styles.foto} />
          <TouchableOpacity style={styles.voltarButton} onPress={voltarParaCamera}>
            <Ionicons name="arrow-back" size={40} color="white" />
            <Text style={styles.buttonText}>Voltar para a Câmera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.camera} type={tipo} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={alternarTipoDeCâmera}>
              <Ionicons 
                name={tipo === CameraType.back ? 'camera-reverse' : 'camera-front-outline'} 
                size={40} 
                color="white" 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={tirarFoto}>
              <Ionicons name="camera" size={60} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black', 
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  foto: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voltarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4081', 
    padding: 10,
    borderRadius: 8,
    margin: 20,
  },
  permissionButton: {
    backgroundColor: '#ff4081', 
    padding: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
});
