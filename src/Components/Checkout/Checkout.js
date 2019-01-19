import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Checkout.css';


class Checkout extends Component {
  render() {
    const { modal, toggle, cart, deleteFromCart, increaseAmount, decreaseAmount, total } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Checkout</ModalHeader>
        <ModalBody>
          {
            cart.length
            ?
            <div>
              <ListGroup>
                {
                  cart.map(item => {
                    return (
                      <ListGroupItem key={item.modelNumber} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '75%'}}>
                          <ListGroupItemHeading>{item.manufacturer} {item.modelNumber}</ListGroupItemHeading>
                          <ListGroupItemText>
                            Price: {item.price}
                          </ListGroupItemText>
                          <Button color='danger' style={{marginTop: 10}} onClick={() => deleteFromCart(item.modelNumber)}>REMOVE</Button>
                        </div>
                        <div style={{paddingLeft: 20, borderLeft: '1px solid #ccc'}}>
                          <p style={{margin: '10px 20px'}}>Amount:</p>
                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <h2 style={{marginRight: 15}}>{item.amount}</h2>
                            <div>
                              <div className='changeAmount increaseAmount' onClick={() => increaseAmount(item.modelNumber)}><FontAwesomeIcon icon="plus" /></div>
                              <div className='changeAmount decreaseAmount' onClick={() => decreaseAmount(item.modelNumber)}><FontAwesomeIcon icon="minus" /></div>
                            </div>
                          </div>
                        </div>
                      </ListGroupItem>
                    )
                  })
                }
              </ListGroup>
              <hr />
              <h3 style={{marginTop: 15}}>Total Price: {total()}</h3>
            </div>
            :
            <h4>You don't have anything in your cart yet...</h4>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Continue <FontAwesomeIcon icon="cash-register" /></Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default Checkout;
