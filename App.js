import React, { useReducer, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter((todo, index) => index !== action.payload) };
    default:
      return state;
  }
};

const Week7 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task) {
      dispatch({ type: 'ADD_TODO', payload: task });
      setTask(''); 
    }
  };

  const removeTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', payload: index });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List</Text>
      </View>
  
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add New..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.saveButton} onPress={addTodo}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
  
      <FlatList
        data={state.todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => removeTodo(index)}>
            <Text style={styles.todoItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingHorizontal: 8,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, 
  },
  saveButtonText: {
    color: '#007BFF',
    fontSize: 16, 
  },
  todoItem: {
    padding: 10,
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});


export default Week7;
