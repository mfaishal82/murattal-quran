import React from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { surahDetails } from "../scripts/surahDetails";

interface SurahPickerProps {
  selectedSurah: string | null;
  setSelectedSurah: (value: string | null) => void;
}

const SurahPicker: React.FC<SurahPickerProps> = ({
  selectedSurah,
  setSelectedSurah,
}) => {
  const surahOptions = surahDetails.map((surah) => {
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