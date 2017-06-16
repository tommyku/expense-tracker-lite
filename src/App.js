import React, { Component } from 'react';
import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { AddTab, RecordsTab, CategoriesTab, ReportTab } from './tabs';

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
          <PivotItem linkText='類別'
            style={TabStyle}>
            <CategoriesTab />
          </PivotItem>
          <PivotItem linkText='報表'
            style={TabStyle}>
            <ReportTab />
          </PivotItem>
        </Pivot>
      </div>
    )
  }
}

export default App;
