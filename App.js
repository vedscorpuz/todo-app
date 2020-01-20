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
        {id: 0, title: 'Take out trash', done: false},
        {id: 1, title: 'cook dinner', done: false},
      ]
    }
  }

  addNewTodo() {
    let todos = this.state.todos;

    todos.unshift({
      id: todos.length + 1,
      todo: this.state.todoInput,
      done: false
    });

    this.setState({
      todos,
      todoInput: ''
    })
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
      />
      <FlatList 
        data={this.state.todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item, index}) => {
          return (
            <TodoItem todoItem={item}/>
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
