import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function MetricsScreen() {
  const rows = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        key: `metric-${i + 1}`,
        fps: 58 - (i % 8),
        mem: 145 + i,
      })),
    [],
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Runtime Metrics Playground</Text>
      <Text style={styles.subtitle}>
        This screen exists to create measurable UI work for performance profiling tests.
      </Text>

      {rows.map((row) => (
        <View key={row.key} style={styles.row}>
          <Text style={styles.cell}>{row.key}</Text>
          <Text style={styles.cell}>JS/UI FPS: {row.fps}</Text>
          <Text style={styles.cell}>Mem: {row.mem} MB</Text>
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
    padding: 18,
    gap: 8,
  },
  title: {
    color: "#F4F4FF",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: "#A7A9BE",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#101423",
    borderColor: "#273056",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cell: {
    color: "#E7E9FF",
    fontSize: 13,
  },
});
