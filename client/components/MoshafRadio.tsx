import React from "react";
import { StyleSheet } from "react-native";
import RadioForm from "react-native-simple-radio-button";

interface MoshafRadioProps {
  reciters: any[];
  selectedReciter: number | null;
  selectedMoshaf: string | null;
  setSelectedMoshaf: (value: string) => void;
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
        .moshaf.map((moshaf: any) => ({
          label: moshaf.name,
          value: moshaf.id,
        }))
    : [];

  return (
    <RadioForm
      radio_props={moshafOptions}
      initial={-1}
      onPress={(value) => setSelectedMoshaf(value)}
      buttonColor={"#2E7D32"}
    />
  );
};

export default MoshafRadio;