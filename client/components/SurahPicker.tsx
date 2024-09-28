import React from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { surahDetails } from "../scripts/surahDetails";

interface SurahPickerProps {
  selectedSurah: string | null;
  setSelectedSurah: (value: string | null) => void;
  availableSurahs: string[];
}

const SurahPicker: React.FC<SurahPickerProps> = ({
  selectedSurah,
  setSelectedSurah,
  availableSurahs,
}) => {
  const surahOptions = surahDetails
    .filter((surah) => availableSurahs.includes(surah.number))
    .map((surah) => {
      const label = `${surah.number}. ${surah.name} {${surah.juz.join(", ")}}`;
      return (
        <Picker.Item key={surah.number} label={label} value={surah.number} />
      );
    });

  return (
    <Picker
      selectedValue={selectedSurah}
      onValueChange={(itemValue) => setSelectedSurah(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Select Surah" value={null} />
      {surahOptions}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  }
});

export default SurahPicker;