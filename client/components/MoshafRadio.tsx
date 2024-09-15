import React, { useEffect } from "react";
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

  useEffect(() => {
    if (moshafOptions.length > 0 && !selectedMoshaf) {
      setSelectedMoshaf(moshafOptions[0].value);
    }
  }, [moshafOptions, selectedMoshaf, setSelectedMoshaf]);

  return (
    <RadioForm
      radio_props={moshafOptions}
      initial={0}
      onPress={(value) => setSelectedMoshaf(value)}
      buttonColor={"#2E7D32"}
    />
  );
};

export default MoshafRadio;