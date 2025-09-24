import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropdownSelect from './DropdownSelect';
import { useLanguage } from '../contexts/LanguageContext';

const ReciterSelection = ({ 
  selectedReciter, 
  reciters, 
  showDropdown, 
  onToggleDropdown, 
  onSelect 
}) => {
  const { t, isRTL } = useLanguage();

  const renderReciterOption = (reciter) => (
    <View style={styles.optionRow}>
      <View style={styles.reciterAvatar}>
        <Text style={styles.avatarText}>{reciter.name.charAt(0)}</Text>
      </View>
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>{reciter.name}</Text>
        <Text style={styles.optionSubtitle}>
          {reciter.moshaf.length} {t('moshafAvailable')}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isRTL && styles.rtlText]}>{t('selectReciter')}</Text>
      
      <DropdownSelect
        placeholder={t('chooseReciter')}
        value={selectedReciter?.name}
        options={reciters}
        isOpen={showDropdown}
        onToggle={onToggleDropdown}
        onSelect={onSelect}
        renderOption={renderReciterOption}
        title={t('selectReciter')}
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
  reciterAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    boxShadow: '0px 2px 4px rgba(99, 102, 241, 0.3)',
    elevation: 4,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  optionInfo: {
    flex: 1,
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

export default ReciterSelection;