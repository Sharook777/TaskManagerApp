import { useCallback, useState } from "react";
import { View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  Text,
  Card,
  IconButton,
  MD3Colors,
} from "react-native-paper";

import { getTasks } from "../../components/services/tasks";
import PageScroll from "../../components/ui/pageScroll";
import FloatingButton from "../../components/ui/floatingButton";
import DeleteModal from "../../components/ui/deleteModal";

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTask, setDeleteTask] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );
  
  const fetchTasks = async () => {
    setLoading(true);
    const { success, data } = await getTasks();
    if (success) setTasks(data);
    setLoading(false);
  };

  function handleAddTask() {
    router.push("/task/createTask");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f2f2",
        padding: 15,
        position: "relative",
      }}
    >
      <PageScroll onRefresh={fetchTasks}>
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
        {!loading && (
          <View
            style={{
              gap: 5,
              flex: 1,
              paddingBottom: 150,
            }}
          >
            {!tasks.length && (
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#1f1e1e",
                    fontFamily: "SF Pro Display",
                  }}
                >
                  No tasks!
                </Text>
              </View>
            )}
            {tasks?.map((item) => (
              <Card
                key={item._id}
                style={{
                  padding: 15,
                  gap: 10,
                  backgroundColor: "#fff",
                  margin: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 1, gap: 5, justifyContent: "center" }}>
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                      numberOfLines={1}
                    >
                      {item?.title}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      mode="contained-tonal"
                      icon="eye"
                      iconColor={MD3Colors.primary50}
                      containerColor={MD3Colors.primary90}
                      size={18}
                      onPress={() => router.push(`/task/${item._id}`)}
                    />
                    <IconButton
                      mode="contained-tonal"
                      icon="delete-outline"
                      iconColor={MD3Colors.error50}
                      containerColor={MD3Colors.error90}
                      size={18}
                      onPress={() => setDeleteTask(item)}
                    />
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
      </PageScroll>
      <FloatingButton handlePress={handleAddTask} />
      <DeleteModal
        visible={!!deleteTask}
        hideModal={() => setDeleteTask(null)}
        item={deleteTask}
        onSuccess={fetchTasks}
      />
    </View>
  );
}
