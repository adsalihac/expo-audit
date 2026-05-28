import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const buildItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Render item ${i + 1}`,
    value: Math.round(Math.sin(i) * 1000),
  }));

export default function HomeScreen() {
  const [count, setCount] = useState(240);

  const expensiveList = useMemo(() => buildItems(count), [count]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <Text style={styles.title}>Expo Sample Performance Test App</Text>
      <Text style={styles.subtitle}>
        Use this project with expo-audit scan, bundle, profile, doctor, and upload commands.
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.button} onPress={() => setCount((v) => v + 40)}>
          <Text style={styles.buttonText}>Add Render Load</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => setCount(120)}>
          <Text style={styles.buttonText}>Reset Load</Text>
        </Pressable>
      </View>

      <Link href="/metrics" style={styles.link}>
        Open Metrics Screen
      </Link>

      {expensiveList.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardValue}>{item.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#09090B",
  },
  content: {
    padding: 20,
    gap: 12,
  },
  title: {
    color: "#F4F4FF",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A7A9BE",
    fontSize: 15,
    lineHeight: 21,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#1E2448",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#F4F4FF",
    fontWeight: "600",
  },
  link: {
    color: "#7DA6FF",
    fontSize: 16,
    marginVertical: 6,
  },
  card: {
    backgroundColor: "#101423",
    borderColor: "#273056",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },
  cardTitle: {
    color: "#E5E8FF",
    fontSize: 14,
  },
  cardValue: {
    color: "#8DE5A8",
    fontSize: 20,
    marginTop: 4,
    fontWeight: "700",
  },
});
