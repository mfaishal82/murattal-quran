import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface Reciter {
  id: number;
  name: string;
  letter: string;
  moshaf: any[]; // Anda mungkin ingin mendefinisikan tipe yang lebih spesifik untuk moshaf
}

interface ReciterPickerProps {
  reciters: Reciter[];
  selectedReciter: number | null;
  setSelectedReciter: (value: number | null) => void;
}

const ReciterPicker: React.FC<ReciterPickerProps> = ({
  reciters,
  selectedReciter,
  setSelectedReciter,
}) => {
  // Urutkan qari berdasarkan huruf (letter)
  const sortedReciters = [...reciters].sort((a, b) => a.letter.localeCompare(b.letter, 'ar'));

  const reciterOptions = sortedReciters.map((reciter) => (
    <Picker.Item key={reciter.id} label={reciter.name} value={reciter.id} />
  ));

  return (
    <Picker
      selectedValue={selectedReciter}
      onValueChange={(itemValue) => setSelectedReciter(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Pilih Qari" value={null} />
      {reciterOptions}
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
    marginBottom: 10,
  }
});

export default ReciterPicker;