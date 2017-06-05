import React, { Component } from 'react';
import { ContainerExpenseForm, ContainerExpenseList } from './containers';

const AppStyle = {
  margin: 'auto',
  maxWidth: '35em',
  padding: '.5em'
};

class App extends Component {
  render() {
    return (
      <div style={AppStyle}>
        <ContainerExpenseForm />
        <ContainerExpenseList />
      </div>
    );
  }
}

export default App;
