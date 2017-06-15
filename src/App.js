import React, { Component } from 'react';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { AddTab, RecordsTab } from './tabs';

const AppStyle = {
  margin: 'auto',
  maxWidth: '35em',
  padding: '.5em'
};

const TabStyle = {
  paddingTop: '1em'
}

class App extends Component {
  render() {
    return (
      <div style={AppStyle}>
        <Pivot linkSize={PivotLinkSize.large}
          linkFormat={PivotLinkFormat.tabs}>
          <PivotItem linkText='使左'
            style={TabStyle}>
            <AddTab />
          </PivotItem>
          <PivotItem linkText='記錄'
            style={TabStyle}>
            <RecordsTab />
          </PivotItem>
        </Pivot>
      </div>
    )
  }
}

export default App;
