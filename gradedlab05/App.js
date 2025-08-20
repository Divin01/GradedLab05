import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Add Task Function
  const addTask = () => {
    const trimmedText = taskText.trim();
    if (!trimmedText) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    
    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      done: false
    };
    
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  // Toggle Task Function
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Delete Task Function
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Render Item Function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text
        style={[styles.taskText, item.done && styles.taskTextDone]}
        onPress={() => toggleTask(item.id)}
      >
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>
          {item.done ? "☑" : "☐"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>To Do List</Text>

      {/* Input Section */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* No Task Message */}
      {tasks.length === 0 && (
        <Text style={styles.noTaskText}>No task added so far</Text>
      )}

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={styles.taskList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: 'aliceblue',
    paddingTop: 80
  },
  inputRow: { 
    flexDirection: 'row', 
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 40
  },
  input: { 
    width: 200,
    borderColor: '#ccc', 
    borderWidth: 1, 
    padding: 12,
    marginLeft: 70, 
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16
  },
  addButton: { 
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  taskList: {
    flex: 1
  },
  taskItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  taskText: { 
    flex: 1, 
    fontSize: 16,
    marginRight: 10
  },
  taskTextDone: { 
    textDecorationLine: 'line-through', 
    color: '#888' 
  },
  checkbox: { 
    marginRight: 15, 
    fontSize: 20 
  },
  deleteButton: { 
    fontSize: 20
  },
  noTaskText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginVertical: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'dodgerblue',
    letterSpacing: 1,
    paddingTop:40,
  },
});

export default App;