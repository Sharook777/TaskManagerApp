import { useState } from "react";
import { View } from "react-native";
import { Modal, Text, Button } from "react-native-paper";

import { deleteTask } from "../services/tasks";
import useToastHook from "../hooks/useToast";

export default function DeleteModal({
  visible = true,
  hideModal = () => {},
  onSuccess = () => {},
  item,
}) {
  const [loading, setLoading] = useState(false);

  const { successToast, errorToast } = useToastHook();

  async function handleDelete() {
    setLoading(true);

    const { success, message } = await deleteTask(item?._id);
    if (success) {
      successToast("Delete successfull");
      hideModal();
      onSuccess();
    } else {
      errorToast(message);
    }
    setLoading(false);
  }
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#000",
          marginBottom: 20,
        }}
      >
        Confirm Delete
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginBottom: 20,
          color: "#000",
        }}
      >
        Are you sure you want to delete this item?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Button
          mode="outlined"
          onPress={hideModal}
          disabled={loading}
          style={{ width: 100 }}
        >
          No
        </Button>
        <Button
          mode="contained"
          onPress={handleDelete}
          loading={loading}
          disabled={loading}
          style={{ width: 100 }}
        >
          Yes
        </Button>
      </View>
    </Modal>
  );
}
