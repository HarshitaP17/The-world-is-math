import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '../context/imageSlice';
import { startAnalysis, setAnalysisResults, setAnalysisError } from '../context/analysisSlice';
import { imageService } from '../services/api';
import { RootState } from '../context/store';

export default function CameraScreen({ navigation }: any) {
  const cameraRef = useRef<CameraView>(null);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.analysis);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.8,
      });

      if (photo.base64) {
        dispatch(setImage({
          uri: photo.uri,
          base64: photo.base64,
        }));
        await analyzeImage(photo.base64);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        dispatch(setImage({
          uri: result.assets[0].uri,
          base64: result.assets[0].base64,
        }));
        await analyzeImage(result.assets[0].base64);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const analyzeImage = async (base64: string) => {
    dispatch(startAnalysis());
    try {
      const results = await imageService.uploadAndAnalyze(base64);
      const analyses = results.analyses.map((analysis, index) => ({
        id: `${results.id}-${index}`,
        type: analysis.type,
        confidence: analysis.confidence,
        description: analysis.description,
        data: analysis.data,
      }));
      dispatch(setAnalysisResults(analyses));
      navigation.navigate('Results');
    } catch (error) {
      dispatch(setAnalysisError(error instanceof Error ? error.message : 'Analysis failed'));
      Alert.alert('Analysis Error', 'Could not analyze image. Make sure backend is running.');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        onCameraReady={() => setIsReady(true)}
        facing="back"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>🌍 The World is Math</Text>
          <Text style={styles.subtitle}>Discover mathematical beauty</Text>
        </View>
      </CameraView>

      <View style={styles.controls}>
        {loading ? (
          <ActivityIndicator size="large" color="#6b8cae" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePickImage}
              disabled={!isReady || loading}
            >
              <Text style={styles.buttonText}>📷 Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.captureButton]}
              onPress={handleTakePhoto}
              disabled={!isReady || loading}
            >
              <Text style={styles.captureText}>●</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Gallery')}
              disabled={loading}
            >
              <Text style={styles.buttonText}>📚 History</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f3f0',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c2c2c',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d4a574',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    fontSize: 40,
    color: '#fff',
  },
});
