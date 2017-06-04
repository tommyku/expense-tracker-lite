import React, { Component } from 'react';
import { ContainerExpenseForm, ContainerExpenseList } from './containers';

class App extends Component {
  render() {
    return (
      <div>
        <ContainerExpenseForm />
        <ContainerExpenseList />
      </div>
    );
  }
}

export default App;
