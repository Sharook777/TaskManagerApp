import { FAB } from "react-native-paper";

export default function FloatingButton({ handlePress }) {
  return (
    <FAB
      icon="plus"
      style={{ position: "absolute", bottom: 60, right: 40 }}
      onPress={handlePress}
      animated
      variant="primary"
    />
  );
}
