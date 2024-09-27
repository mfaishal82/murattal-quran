import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

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

  // Menentukan index pilihan berdasarkan `selectedMoshaf`
  const initialIndex = moshafOptions.findIndex(
    (option: MoshafOption) => option.value === selectedMoshaf
  );

  useEffect(() => {
    if (initialIndex === -1 && moshafOptions.length > 0) {
      setSelectedMoshaf(moshafOptions[0].value);
    }
  }, [moshafOptions]);

  return (
    <RadioForm
      radio_props={moshafOptions}
      initial={initialIndex >= 0 ? initialIndex : 0}
      onPress={(value) => setSelectedMoshaf(value)}
      buttonColor={"#2E7D32"}
    />
  );
};

export default MoshafRadio;