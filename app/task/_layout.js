import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
} from "react-native";
import { Stack, router } from "expo-router";
import { Text, Card, Avatar, Drawer } from "react-native-paper";

import useAuth from "../../components/context/auth";

function ProtectedLayout() {
  const { user, logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user]);

  useEffect(() => {
    const handleBackPress = () => {
      if (drawerOpen) {
        setDrawerOpen(!drawerOpen);
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, [drawerOpen]);

  return (
    <>
      <Stack
        screenOptions={{
          header: ({ route }) => (
            <Header
              title={route.name}
              onDrawerOpen={() => setDrawerOpen(!drawerOpen)}
            />
          ),
        }}
      />
      {drawerOpen && (
        <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
          <View
            style={{
              position: "absolute",
              top: 70,
              right: 0,
              bottom: 0,
              width: "100%",
              backgroundColor: "#00000040",
              alignItems: "flex-end",
            }}
          >
            <Drawer.Section
              style={{
                padding: 10,
                width: 100,
                backgroundColor: "#fff",
                flex: 1,
                elevation: 4,
              }}
            >
              <Drawer.CollapsedItem
                label="Reset Password"
                unfocusedIcon="lock-reset"
                onPress={() => {
                  router.push("/task/resetPassword");
                  setDrawerOpen(false);
                }}
              />
              <Drawer.CollapsedItem
                label="Logout"
                unfocusedIcon="logout"
                onPress={logout}
              />
            </Drawer.Section>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

export default function Layout() {
  return <ProtectedLayout />;
}

const SCREENS_MAP = {
  taskList: "Task Manager",
  createTask: "Create Task",
  "[taskid]/index": "View Task",
  "[taskid]/edit": "Update Task",
  resetPassword: "Reset Password",
};

function Header({ title, onDrawerOpen }) {
  const { user } = useAuth();

  return (
    <Card
      style={{
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>
          {SCREENS_MAP[title] ?? title}
        </Text>
        <TouchableOpacity onPress={onDrawerOpen}>
          <Avatar.Text size={30} label={user?.name?.[0]} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}
