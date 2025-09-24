import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';
const RECENT_KEY = '@recent';

const FavoritesAndRecent = ({ 
  visible, 
  onClose, 
  onPlayReciter,
  reciters 
}) => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [recentPlayed, setRecentPlayed] = useState([]);

  useEffect(() => {
    if (visible) {
      loadFavorites();
      loadRecentPlayed();
    }
  }, [visible]);

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesData) {
        const favoriteIds = JSON.parse(favoritesData);
        const favoriteReciters = reciters.filter(reciter => 
          favoriteIds.includes(reciter.id)
        );
        setFavorites(favoriteReciters);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadRecentPlayed = async () => {
    try {
      const recentData = await AsyncStorage.getItem(RECENT_KEY);
      if (recentData) {
        const recentIds = JSON.parse(recentData);
        const recentReciters = recentIds.map(id => 
          reciters.find(reciter => reciter.id === id)
        ).filter(Boolean);
        setRecentPlayed(recentReciters);
      }
    } catch (error) {
      console.error('Error loading recent played:', error);
    }
  };

  const toggleFavorite = async (reciter) => {
    try {
      const currentFavorites = favorites.map(fav => fav.id);
      let newFavorites;
      
      if (currentFavorites.includes(reciter.id)) {
        newFavorites = currentFavorites.filter(id => id !== reciter.id);
        setFavorites(favorites.filter(fav => fav.id !== reciter.id));
      } else {
        newFavorites = [...currentFavorites, reciter.id];
        setFavorites([...favorites, reciter]);
      }
      
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const renderReciterItem = ({ item }) => {
    const isFavorite = favorites.some(fav => fav.id === item.id);
    
    return (
      <TouchableOpacity 
        style={styles.reciterItem}
        onPress={() => {
          onPlayReciter(item);
          onClose();
        }}
      >
        <View style={styles.reciterContent}>
          <View style={styles.reciterInfo}>
            <Text style={styles.reciterName}>{item.name}</Text>
            <Text style={styles.moshafName}>
              {item.moshaf[0]?.name || 'غير متوفر'}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item)}
            >
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={20} 
                color={isFavorite ? "#ff4757" : "#666"} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const EmptyComponent = ({ message }) => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name={activeTab === 'favorites' ? 'heart-outline' : 'time-outline'} 
        size={50} 
        color="rgba(255, 255, 255, 0.5)" 
      />
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );

  const currentData = activeTab === 'favorites' ? favorites : recentPlayed;
  const emptyMessage = activeTab === 'favorites' 
    ? 'لا توجد مفضلات بعد' 
    : 'لا توجد مشاهدات حديثة';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>المفضلة والحديثة</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
              onPress={() => setActiveTab('favorites')}
            >
              <Ionicons 
                name="heart" 
                size={18} 
                color={activeTab === 'favorites' ? '#fff' : 'rgba(255, 255, 255, 0.6)'} 
              />
              <Text style={[
                styles.tabText, 
                activeTab === 'favorites' && styles.activeTabText
              ]}>
                المفضلة
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'recent' && styles.activeTab]}
              onPress={() => setActiveTab('recent')}
            >
              <Ionicons 
                name="time" 
                size={18} 
                color={activeTab === 'recent' ? '#fff' : 'rgba(255, 255, 255, 0.6)'} 
              />
              <Text style={[
                styles.tabText, 
                activeTab === 'recent' && styles.activeTabText
              ]}>
                الأخيرة
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <FlatList
            data={currentData}
            renderItem={renderReciterItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyComponent message={emptyMessage} />}
          />
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  reciterItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    boxShadow: '0px 1px 2.22px rgba(0, 0, 0, 0.22)',
  },
  reciterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  reciterInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  reciterName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    marginBottom: 4,
  },
  moshafName: {
    fontSize: 13,
    color: '#666',
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  playButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(102, 126, 234, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default FavoritesAndRecent;