import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Text,
  ActivityIndicator,
  IconButton,
  MD3Colors,
} from "react-native-paper";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";

import { getTask } from "../../../components/services/tasks";
import PageScroll from "../../../components/ui/pageScroll";
import DeleteModal from "../../../components/ui/deleteModal";

export default function TaskDetails() {
  const { taskid } = useLocalSearchParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);

  const fetchTask = async () => {
    setLoading(true);
    const { success, data } = await getTask(taskid);
    if (success) setTask(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTask();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f2f2",
        padding: 20,
        position: "relative",
      }}
    >
      <PageScroll>
        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 5,
            }}
          >
            <ActivityIndicator size={50} />
          </View>
        )}
        {!loading && task && (
          <View style={{ flex: 1, gap: 30 }}>
            <View style={{ gap: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Title</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    mode="contained-tonal"
                    icon="pencil-outline"
                    iconColor={MD3Colors.primary50}
                    containerColor={MD3Colors.primary90}
                    size={18}
                    onPress={() => router.push(`/task/${task._id}/edit`)}
                  />
                  <IconButton
                    mode="contained-tonal"
                    icon="delete-outline"
                    iconColor={MD3Colors.error50}
                    containerColor={MD3Colors.error90}
                    size={18}
                    onPress={() => setDeleteTask(true)}
                  />
                </View>
              </View>

              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {task.title}
              </Text>
            </View>
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Description
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {task.description}
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            paddingVertical: 10,
            gap: 10,
          }}
        >
          <Button
            mode="outlined"
            onPress={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </View>
      </PageScroll>
      <DeleteModal
        visible={deleteTask}
        hideModal={() => setDeleteTask(false)}
        item={task}
        onSuccess={() => router.back()}
      />
    </View>
  );
}
