import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropdownSelect from './DropdownSelect';
import { useLanguage } from '../contexts/LanguageContext';
import { getSurahName } from '../constants/translations';

const SurahSelection = ({ 
  selectedSurah, 
  selectedMoshaf, 
  showDropdown, 
  onToggleDropdown, 
  onSelect 
}) => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const renderSurahOption = (surah) => (
    <View style={styles.optionRow}>
      <View style={styles.surahNumber}>
        <Text style={styles.surahNumberText}>{surah.number}</Text>
      </View>
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>{surah.name}</Text>
      </View>
      <Ionicons name="play-circle" size={20} color="#6366f1" />
    </View>
  );

  if (!selectedMoshaf) return null;

  const availableSurahs = selectedMoshaf.surah_list.split(',').map(num => parseInt(num));
  const surahOptions = availableSurahs.map(num => ({
    number: num,
    name: getSurahName(num, currentLanguage),
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isRTL && styles.rtlText]}>{t('selectSurah')}</Text>
      <Text style={[styles.description, isRTL && styles.rtlText]}>
        {t('selectSurah')} {t('fromMoshaf')}: {selectedMoshaf.name}
      </Text>
      
      <DropdownSelect
        placeholder={t('chooseSurah')}
        value={selectedSurah?.name}
        options={surahOptions}
        isOpen={showDropdown}
        onToggle={onToggleDropdown}
        onSelect={onSelect}
        renderOption={renderSurahOption}
        title={t('selectSurah')}
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
  surahNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(99, 102, 241, 0.3)',
    elevation: 3,
  },
  surahNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
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
  
  // RTL Support
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default SurahSelection;