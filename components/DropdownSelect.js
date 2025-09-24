import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../contexts/LanguageContext';

const DropdownSelect = ({ 
  placeholder, 
  value, 
  options, 
  isOpen, 
  onToggle, 
  onSelect, 
  disabled, 
  renderOption,
  title
}) => {
  const { t, isRTL } = useLanguage();
  const displayTitle = title || t('selectFromList');
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onToggle}
        disabled={disabled}
      >
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={disabled ? "#cbd5e1" : "#6366f1"} 
        />
        <Text style={[
          styles.buttonText, 
          !value && styles.placeholderText,
          disabled && styles.buttonTextDisabled
        ]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={onToggle}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={[styles.title, isRTL && styles.rtlText]}>{displayTitle}</Text>
            </View>
            
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              style={styles.list}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    index === options.length - 1 && styles.optionLast
                  ]}
                  onPress={() => onSelect(item)}
                >
                  {renderOption ? renderOption(item) : (
                    <Text style={styles.optionText}>{item.name || item}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity style={styles.closeButton} onPress={onToggle}>
              <Text style={styles.closeButtonText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    elevation: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.1)',
  },
  buttonDisabled: {
    backgroundColor: '#f8fafc',
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
  placeholderText: {
    color: '#94a3b8',
    fontWeight: '500',
  },
  buttonTextDisabled: {
    color: '#cbd5e1',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    maxHeight: '80%',
    elevation: 8,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    backgroundColor: '#fafbfc',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  list: {
    maxHeight: 400,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  optionLast: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  closeButton: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6366f1',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  // RTL Support
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});

export default DropdownSelect;