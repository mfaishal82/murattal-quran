import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MoshafRadioProps {
  reciters: any[];
  selectedReciter: number | null;
  selectedMoshaf: string | null;
  setSelectedMoshaf: (value: string) => void;
}

interface MoshafOption {
  label: string;
  value: string;
}

const MoshafRadio: React.FC<MoshafRadioProps> = ({
  reciters,
  selectedReciter,
  selectedMoshaf,
  setSelectedMoshaf,
}) => {
  const moshafOptions = selectedReciter
    ? reciters
        .find((r) => r.id === selectedReciter)
        ?.moshaf.map((moshaf: any) => ({
          label: moshaf.name,
          value: moshaf.id,
        })) || []
    : [];

  useEffect(() => {
    if (moshafOptions.length > 0 && !selectedMoshaf) {
      setSelectedMoshaf(moshafOptions[0].value);
    }
  }, [moshafOptions, selectedMoshaf]);

  return (
    <View style={styles.container}>
      {moshafOptions.map((option: MoshafOption, index: number) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.radioButton,
            selectedMoshaf === option.value && styles.radioButtonSelected,
          ]}
          onPress={() => setSelectedMoshaf(option.value)}
        >
          <View style={styles.radioCircle}>
            {selectedMoshaf === option.value && <View style={styles.selectedRb} />}
          </View>
          <Text style={styles.radioText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  radioButtonSelected: {
    backgroundColor: '#E8F5E9',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E7D32',
  },
  radioText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default MoshafRadio;