import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FloatingButton = (props) => {
  return (
    <div onClick={props.toggle} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', bottom: 50, right: 25, borderRadius: '50%', height: 75, width: 75, backgroundColor: '#18A2B8', fontSize: '2em', cursor: 'pointer' }}>
      <FontAwesomeIcon icon="shopping-cart" />
    </div>
  );
}

export default FloatingButton;
