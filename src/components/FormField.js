import React from 'react';

export default (props)=> {
  const { style, ...others } = props;
  const FormFieldStyle = Object.assign(style || {}, {
    marginBottom: '1em',
    display: 'block',
  });

  return (
    <div style={FormFieldStyle} {...others}>
      {props.children}
    </div>
  );
};
