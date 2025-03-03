import { Slot } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

import { AuthProvider } from "../components/context/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider
        placement="bottom"
        duration={3000}
        animationType="slide-in"
        animationDuration={200}
        successColor="#00CC45"
        dangerColor="#D12929"
        warningColor="#FF630C"
        normalColor="#0062BA"
        offset={50}
        offsetTop={30}
        offsetBottom={40}
      >
        <Slot />
      </ToastProvider>
    </AuthProvider>
  );
}
