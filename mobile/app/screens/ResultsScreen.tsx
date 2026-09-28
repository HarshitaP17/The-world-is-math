import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../context/store';
import { clearImage } from '../context/imageSlice';
import { clearAnalysis } from '../context/analysisSlice';

export default function ResultsScreen({ navigation }: any) {
  const { uri: imageUri } = useSelector((state: RootState) => state.image);
  const { results, loading, error, currentAnalysis } = useSelector(
    (state: RootState) => state.analysis
  );
  const dispatch = useDispatch();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6b8cae" />
        <Text style={styles.loadingText}>Analyzing mathematical patterns...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>⚠️ Analysis Failed</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            dispatch(clearAnalysis());
            navigation.goBack();
          }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleNewAnalysis = () => {
    dispatch(clearImage());
    dispatch(clearAnalysis());
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      {currentAnalysis && (
        <View style={styles.resultsCard}>
          <Text style={styles.analysisType}>
            {getEmoji(currentAnalysis.type)} {currentAnalysis.type}
          </Text>
          <View style={styles.confidenceBar}>
            <View
              style={[
                styles.confidenceFill,
                { width: `${currentAnalysis.confidence * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.confidence}>
            Confidence: {(currentAnalysis.confidence * 100).toFixed(1)}%
          </Text>

          <Text style={styles.description}>{currentAnalysis.description}</Text>

          {currentAnalysis.data && Object.keys(currentAnalysis.data).length > 0 && (
            <View style={styles.dataSection}>
              <Text style={styles.dataTitle}>Mathematical Properties</Text>
              {Object.entries(currentAnalysis.data).map(([key, value]) => (
                <View key={key} style={styles.dataRow}>
                  <Text style={styles.dataKey}>{key}:</Text>
                  <Text style={styles.dataValue}>
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {results.length > 1 && (
        <View style={styles.otherResults}>
          <Text style={styles.otherTitle}>Other Detected Patterns</Text>
          {results.slice(1).map((result) => (
            <TouchableOpacity key={result.id} style={styles.otherCard}>
              <Text style={styles.otherType}>{getEmoji(result.type)} {result.type}</Text>
              <Text style={styles.otherConfidence}>
                {(result.confidence * 100).toFixed(0)}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleNewAnalysis}>
          <Text style={styles.actionText}>📸 Analyze Another Image</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function getEmoji(type: string): string {
  const emojis: Record<string, string> = {
    geometry: '🔹',
    fractal: '🌀',
    symmetry: '↔️',
    tessellation: '📐',
    harmony: '🎨',
  };
  return emojis[type.toLowerCase()] || '✨';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f3f0',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b8cae',
    fontStyle: 'italic',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f3f0',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: '#6b5a4f',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#d4a574',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#ddd',
  },
  resultsCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6b8cae',
  },
  analysisType: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a5c7a',
    marginBottom: 12,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#a98b7f',
    borderRadius: 4,
  },
  confidence: {
    fontSize: 14,
    color: '#6b5a4f',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2c2c2c',
    marginBottom: 16,
  },
  dataSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  dataTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b8cae',
    marginBottom: 12,
  },
  dataRow: {
    marginBottom: 8,
  },
  dataKey: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5c7a',
  },
  dataValue: {
    fontSize: 13,
    color: '#6b5a4f',
    marginTop: 4,
  },
  otherResults: {
    margin: 16,
  },
  otherTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5c7a',
    marginBottom: 12,
  },
  otherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#d4a574',
  },
  otherType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c2c2c',
  },
  otherConfidence: {
    fontSize: 14,
    color: '#6b8cae',
    fontWeight: '600',
  },
  actions: {
    padding: 16,
    paddingBottom: 32,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#6b8cae',
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
