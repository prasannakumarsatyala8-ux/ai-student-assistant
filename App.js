
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: "1", title: "Study C programming", done: false },
    { id: "2", title: "Revise mathematics", done: false },
    { id: "3", title: "Complete assignments", done: true },
  ]);

  function addTask() {
    const title = task.trim();
    if (title === "") return;

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now().toString(),
        title: title,
        done: false,
      },
    ]);

    setTask("");
    Keyboard.dismiss();
  }

  function toggleTask(id) {
    setTasks((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  }

  const completed = tasks.filter((item) => item.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        AI Student Assistant
      </Text>

      <Text style={styles.subtitle}>
        Your daily study companion
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Today's Progress
        </Text>
        <Text style={styles.progress}>
          {completed} of {tasks.length} tasks completed
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        My Study Tasks
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new study task"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />

        <Pressable
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>
            Add
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Add your first study task!
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.task}
            onPress={() => toggleTask(item.id)}
          >
            <Text style={styles.taskIcon}>
              {item.done ? "✅" : "⬜"}
            </Text>

            <Text
              style={[
                styles.taskText,
                item.done && styles.completed,
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.footer}>
        Small steps every day lead to big results!
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FC",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#183B70",
  },
  subtitle: {
    fontSize: 15,
    color: "#667085",
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#183B70",
  },
  progress: {
    fontSize: 16,
    marginTop: 10,
    color: "#475467",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#183B70",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 18,
    gap: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#245CC5",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 15,
    flexGrow: 1,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    gap: 12,
  },
  taskIcon: {
    fontSize: 18,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#344054",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#98A2B3",
  },
  empty: {
    color: "#667085",
    textAlign: "center",
    marginTop: 20,
  },
  footer: {
    textAlign: "center",
    color: "#667085",
    paddingVertical: 12,
    fontSize: 13,
  },
});

