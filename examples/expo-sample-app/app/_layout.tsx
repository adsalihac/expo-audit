import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#09090B" },
        headerTintColor: "#F7F7FF",
        contentStyle: { backgroundColor: "#09090B" },
      }}
    />
  );
}
