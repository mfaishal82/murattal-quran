import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = ({ showLabel = false, inDrawer = false }) => {
  const { currentLanguage, changeLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'id' : 'ar';
    changeLanguage(newLanguage);
  };

  const containerStyle = inDrawer ? styles.drawerContainer : styles.container;
  const buttonStyle = inDrawer ? styles.drawerToggleButton : styles.toggleButton;

  return (
    <TouchableOpacity style={containerStyle} onPress={toggleLanguage}>
      <View style={buttonStyle}>
        <Ionicons 
          name="language" 
          size={inDrawer ? 18 : 20} 
          color={inDrawer ? "#fff" : "#4A90E2"} 
        />
        <Text style={inDrawer ? styles.drawerLanguageText : styles.languageText}>
          {currentLanguage === 'ar' ? 'عربي' : 'ID'}
        </Text>
        <View style={inDrawer ? styles.drawerDivider : styles.divider} />
        <Text style={inDrawer ? styles.drawerNextText : styles.nextText}>
          {currentLanguage === 'ar' ? 'ID' : 'عربي'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  drawerContainer: {
    width: '100%',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  drawerToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  languageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  drawerLanguageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 8,
  },
  drawerDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 12,
  },
  nextText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
  },
  drawerNextText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LanguageToggle;