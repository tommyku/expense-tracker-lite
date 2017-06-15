import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorHash from 'color-hash';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

const ButtonStyle = {
  marginLeft: '.5em',
};

const colorHash = new ColorHash({lightness: 0.5, saturation: 0.5});

const CategoryItem = (props)=> {
  const {style, item, ...other} = props;
  let rootStyle = Object.assign(style || {}, {
    backgroundColor: colorHash.hex(props.item.uuid),
    color: '#ffffff',
    padding: '.5em'
  });
  return (
    <div {...other}
      style={rootStyle}>
      <span>{item.name}</span>
    </div>
  );
};

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      focusItemUuid: '',
      focusItemName: ''
    }
    this.showItemDialog = this.showItemDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.closeDialogAndSave = this.closeDialogAndSave.bind(this);
  }

  showItemDialog(e) {
    const { uuid } = e.target.dataset;
    this.setState({
      showDialog: true,
      focusItemUuid: uuid,
      focusItemName: this.props.categories[uuid].name
    });
  }

  closeDialog() {
    this.setState({showDialog: false});
  }

  closeDialogAndSave() {
    this.closeDialog();
    this.props.handleUpdateCategory({
      category: Object.assign({},
        this.props.categories[this.state.focusItemUuid],
        {name: this.state.focusItemName}
      )
    });
  }

  render() {
    const { categories } = this.props;
    return (
      <section>
        {
          Object.keys(categories).map((key, index)=> (
            <CategoryItem item={categories[key]}
              onClick={this.showItemDialog}
              data-uuid={key}
              key={key} />
          ))
        }
        <Dialog
          isOpen={this.state.showDialog}
          type={DialogType.normal}
          onDismiss={this.closeDialog}
          title='改野'
          isBlocking={ false }>

          <TextField
            type='text'
            label='類別名'
            value={this.state.focusItemName}
            onChanged={(focusItemName)=> this.setState({focusItemName})}
          />

          <DialogFooter>
            <PrimaryButton onClick={this.closeDialogAndSave}
              style={ButtonStyle}
              text='改完' />
            <DefaultButton onClick={this.closeDialog}
              style={ButtonStyle}
              text='算' />
          </DialogFooter>
        </Dialog>
      </section>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.object
};

export default CategoriesList;
