import { useState, useCallback } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { RefreshControl } from "react-native-web-refresh-control";

export default function PageScroll({ children, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  function handleRefresh() {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  }

  const onRefreshHandle = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    setRefreshing(false);
  }, [onRefresh]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        style={{ flex: 1 }}
      >
        <ScrollView
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={"handled"}
          nestedScrollEnabled={true}
          automaticallyAdjustKeyboardInsets={true}
          {...(onRefresh && {
            refreshControl: (
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={onRefreshHandle}
              />
            ),
          })}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
