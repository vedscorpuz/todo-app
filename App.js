import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import InputBar from './components/inputBar';

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



  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

  return (
    <View style={styles.container}>
      {statusbar}

      <Header title="What to do?" />
      <InputBar/>
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
