import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header';
import InputBar from './components/inputBar';
import TodoItem from './components/TodoItem';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todoInput: '',
      todos: [
        {id: 0, title: 'Study and Code projects', done: false},
        {id: 1, title: 'Cook Dinner', done: false},
      ]
    }
  }

  // Add item on the list
  addNewTodo() {
    let todos = this.state.todos;

    todos.unshift({
      id: todos.length + 1,
      title: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    })
  }

  // Toggle item from the list when it's done; lower opacity
  toggleDone (item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }

      return todo;
    })
    this.setState({todos});
  }

  // Remove item from the list
  removeTodo (item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);

    this.setState({todos});
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

  return (
    <View style={styles.container}>
      {statusbar}

      <Header title="What to do?" />
      <InputBar 
        textChange={todoInput => this.setState({todoInput})}
        addNewTodo={ () => this.addNewTodo() }
        todoInput={this.state.todoInput}
      />
      <FlatList 
        data={this.state.todos}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item, index}) => {
          return (
            <TodoItem 
            todoItem={item} 
            toggleDone={() => this.toggleDone(item)} 
            removeTodo={() => this.removeTodo(item)}
            />
          ) 
        } }
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusbar: {
    backgroundColor: '#051838',
    height: 50
  }
});
