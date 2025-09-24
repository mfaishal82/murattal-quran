import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  SafeAreaView,
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

const DrawerMenu = ({ visible, onClose, onOpenFavorites }) => {
  const { t, isRTL } = useLanguage();
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    {
      id: 'favorites',
      title: t('favorites') || 'المفضلة',
      subtitle: t('viewFavorites') || 'عرض قائمة المفضلة',
      icon: 'heart',
      color: '#ef4444',
      onPress: () => {
        onClose();
        onOpenFavorites();
      }
    }
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouch} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <Animated.View 
          style={[
            styles.drawer,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <LinearGradient 
            colors={['#1e3c72', '#2a5298', '#6366f1']} 
            style={styles.drawerContent}
          >
            <SafeAreaView style={styles.safeArea}>
              {/* Header */}
              <View style={styles.drawerHeader}>
                <View style={styles.headerInfo}>
                  <Text style={[styles.headerTitle, isRTL && styles.rtlText]}>
                    {t('appTitle') || 'مرتل القرآن'}
                  </Text>
                  <Text style={[styles.headerSubtitle, isRTL && styles.rtlText]}>
                    {t('menu') || 'القائمة'}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Language Toggle Section */}
              <View style={styles.languageSection}>
                <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
                  {t('language') || 'اللغة'}
                </Text>
                <View style={styles.languageContainer}>
                  <LanguageToggle inDrawer={true} />
                </View>
              </View>

              {/* Menu Items */}
              <View style={styles.menuSection}>
                <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>
                  {t('options') || 'الخيارات'}
                </Text>
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.menuItem}
                    onPress={item.onPress}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                        <Ionicons name={item.icon} size={24} color={item.color} />
                      </View>
                      <View style={[styles.menuText, isRTL && styles.rtlMenuText]}>
                        <Text style={[styles.menuTitle, isRTL && styles.rtlText]}>
                          {item.title}
                        </Text>
                        <Text style={[styles.menuSubtitle, isRTL && styles.rtlText]}>
                          {item.subtitle}
                        </Text>
                      </View>
                      <Ionicons 
                        name={isRTL ? "chevron-back" : "chevron-forward"} 
                        size={20} 
                        color="rgba(255, 255, 255, 0.6)" 
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, isRTL && styles.rtlText]}>
                  {t('appVersion') || 'الإصدار'} 1.0.0
                </Text>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouch: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    zIndex: 1000,
  },
  drawerContent: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'left',
  },
  languageContainer: {
    alignItems: 'flex-start',
  },
  menuSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuItem: {
    marginBottom: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  rtlMenuText: {
    alignItems: 'flex-end',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  
  // RTL Support
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default DrawerMenu;