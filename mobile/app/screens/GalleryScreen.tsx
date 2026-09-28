import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { imageService } from '../services/api';

interface Analysis {
  id: string;
  image_url: string;
  analyses: Array<{
    type: string;
    confidence: number;
  }>;
  created_at: string;
}

export default function GalleryScreen({ navigation }: any) {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    try {
      const data = await imageService.getAnalysisHistory();
      setAnalyses(data);
    } catch (error) {
      console.error('Failed to load analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnalyses();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6b8cae" />
        <Text style={styles.loadingText}>Loading gallery...</Text>
      </View>
    );
  }

  if (analyses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>📸</Text>
        <Text style={styles.emptyTitle}>No analyses yet</Text>
        <Text style={styles.emptySubtitle}>
          Capture or upload images to see your discoveries here
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderAnalysisCard = ({ item }: { item: Analysis }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
        <Text style={styles.cardCount}>
          {item.analyses.length} pattern{item.analyses.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.patterns}>
        {item.analyses.slice(0, 2).map((analysis, index) => (
          <View key={index} style={styles.patternBadge}>
            <Text style={styles.patternName}>{analysis.type}</Text>
            <Text style={styles.patternConfidence}>
              {(analysis.confidence * 100).toFixed(0)}%
            </Text>
          </View>
        ))}
        {item.analyses.length > 2 && (
          <View style={styles.patternBadge}>
            <Text style={styles.patternName}>+{item.analyses.length - 2} more</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonSmall}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📚 Analysis History</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={analyses}
        renderItem={renderAnalysisCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButtonSmall: {
    fontSize: 16,
    color: '#6b8cae',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c2c2c',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f3f0',
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b5a4f',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6b8cae',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a574',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5c7a',
  },
  cardCount: {
    fontSize: 13,
    color: '#6b5a4f',
  },
  patterns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  patternBadge: {
    backgroundColor: '#fafaf8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  patternName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5c7a',
  },
  patternConfidence: {
    fontSize: 12,
    color: '#a98b7f',
    marginTop: 2,
  },
});
