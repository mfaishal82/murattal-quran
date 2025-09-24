import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropdownSelect from './DropdownSelect';
import { useLanguage } from '../contexts/LanguageContext';

const MoshafSelection = ({ 
  selectedMoshaf, 
  selectedReciter, 
  showDropdown, 
  onToggleDropdown, 
  onSelect 
}) => {
  const { t, isRTL } = useLanguage();

  const renderMoshafOption = (moshaf) => (
    <View style={styles.optionRow}>
      <View style={styles.moshafIcon}>
        <Ionicons name="book" size={20} color="#6366f1" />
      </View>
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>{moshaf.name}</Text>
        <Text style={styles.optionSubtitle}>
          {moshaf.surah_total} {t('surahAvailable')}
        </Text>
      </View>
    </View>
  );

  if (!selectedReciter) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isRTL && styles.rtlText]}>{t('selectMoshaf')}</Text>
      <Text style={[styles.description, isRTL && styles.rtlText]}>
        {t('selectMoshaf')} {t('forReciter')}: {selectedReciter.name}
      </Text>
      
      <DropdownSelect
        placeholder={t('chooseMoshaf')}
        value={selectedMoshaf?.name}
        options={selectedReciter.moshaf}
        isOpen={showDropdown}
        onToggle={onToggleDropdown}
        onSelect={onSelect}
        renderOption={renderMoshafOption}
        title={t('selectMoshaf')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '500',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  moshafIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  optionTitle: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 20,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 2,
    fontWeight: '500',
  },
  
  // RTL Support
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default MoshafSelection;