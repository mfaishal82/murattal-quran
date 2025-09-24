import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../contexts/LanguageContext';
import { getSurahName } from '../constants/translations';

const FavoritesModal = ({ visible, onClose, favorites, reciters, onPlayFavorite, onRemoveFavorite }) => {
  const { t, isRTL, currentLanguage } = useLanguage();

  const getFavoriteDetails = (favoriteKey) => {
    const [reciterId, moshafId, surahNumber] = favoriteKey.split('_');
    const reciter = reciters.find(r => r.id.toString() === reciterId);
    const moshaf = reciter?.moshaf.find(m => m.id.toString() === moshafId);
    
    return {
      reciter,
      moshaf,
      surahNumber: parseInt(surahNumber),
      favoriteKey
    };
  };

  const handleRemoveFavorite = (favoriteKey) => {
    const favorite = getFavoriteDetails(favoriteKey);
    if (favorite.reciter) {
      Alert.alert(
        t('confirmRemove') || 'تأكيد الحذف',
        `${t('removeFavorite') || 'حذف من المفضلة'}:\n${favorite.reciter.name}\n${favorite.moshaf?.name || ''}\nسورة ${favorite.surahNumber}`,
        [
          {
            text: t('cancel') || 'إلغاء',
            style: 'cancel'
          },
          {
            text: t('remove') || 'حذف',
            style: 'destructive',
            onPress: () => onRemoveFavorite(favoriteKey)
          }
        ]
      );
    }
  };

  const getSurahNameById = (surahNumber) => {
    return getSurahName(surahNumber, currentLanguage);
  };

  const renderFavoriteItem = (favoriteKey) => {
    const favorite = getFavoriteDetails(favoriteKey);
    
    if (!favorite.reciter || !favorite.moshaf) {
      return null;
    }

    const surahName = getSurahNameById(favorite.surahNumber);

    return (
      <View key={favoriteKey} style={styles.favoriteItem}>
        <TouchableOpacity
          style={styles.favoriteContent}
          onPress={() => onPlayFavorite(favorite)}
        >
          <View style={styles.surahNumber}>
            <Text style={styles.surahNumberText}>{favorite.surahNumber}</Text>
          </View>
          
          <View style={[styles.favoriteInfo, isRTL && styles.rtlFavoriteInfo]}>
            <Text style={[styles.surahName, isRTL && styles.rtlText]}>
              {surahName}
            </Text>
            <Text style={[styles.reciterName, isRTL && styles.rtlText]}>
              {favorite.reciter.name}
            </Text>
            <Text style={[styles.moshafName, isRTL && styles.rtlText]}>
              {favorite.moshaf.name}
            </Text>
          </View>

          <View style={styles.favoriteActions}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => onPlayFavorite(favorite)}
            >
              <Ionicons name="play" size={20} color="#6366f1" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveFavorite(favoriteKey)}
            >
              <Ionicons name="heart" size={20} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const validFavorites = favorites.filter(favoriteKey => {
    const favorite = getFavoriteDetails(favoriteKey);
    return favorite.reciter && favorite.moshaf;
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <LinearGradient colors={['#1e3c72', '#2a5298', '#6366f1']} style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={[styles.headerContent, isRTL && styles.rtlAlign]}>
              <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
                {t('favorites') || 'المفضلة'}
              </Text>
              <Text style={[styles.headerSubtitle, isRTL && styles.rtlText]}>
                {validFavorites.length} {t('items') || 'عنصر'}
              </Text>
            </View>
            <View style={styles.headerIcon}>
              <Ionicons name="heart" size={24} color="#ef4444" />
            </View>
          </View>

          {/* Content */}
          {validFavorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={80} color="rgba(255, 255, 255, 0.3)" />
              <Text style={[styles.emptyTitle, isRTL && styles.rtlText]}>
                {t('noFavorites') || 'لا توجد مفضلة'}
              </Text>
              <Text style={[styles.emptySubtitle, isRTL && styles.rtlText]}>
                {t('addFavoritesMessage') || 'أضف بعض السور المفضلة لديك'}
              </Text>
            </View>
          ) : (
            <ScrollView 
              style={styles.favoritesList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {validFavorites.map(renderFavoriteItem)}
            </ScrollView>
          )}
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  favoriteItem: {
    marginBottom: 16,
  },
  favoriteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  surahNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  favoriteInfo: {
    flex: 1,
  },
  rtlFavoriteInfo: {
    alignItems: 'flex-end',
  },
  surahName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  reciterName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  moshafName: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  favoriteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // RTL Support
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlAlign: {
    alignItems: 'flex-end',
  },
});

export default FavoritesModal;