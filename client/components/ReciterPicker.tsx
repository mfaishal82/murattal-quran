import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

interface ReciterPickerProps {
  reciters: any[];
  selectedReciter: number | null;
  setSelectedReciter: (value: number | null) => void;
}

const ReciterPicker: React.FC<ReciterPickerProps> = ({
  reciters,
  selectedReciter,
  setSelectedReciter,
}) => {
  const reciterOptions = reciters.map((reciter) => (
    <Picker.Item key={reciter.id} label={reciter.name} value={reciter.id} />
  ));

  return (
    <Picker
      selectedValue={selectedReciter}
      onValueChange={(itemValue) => setSelectedReciter(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Select Reciter" value={null} />
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