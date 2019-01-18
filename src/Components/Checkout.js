import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Checkout extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Checkout</ModalHeader>
        <ModalBody>
          {
            this.props.cart.length
            ?
            <ListGroup>
              {
                this.props.cart.map(item => {
                  return (
                    <ListGroupItem key={item.modelNumber} style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{width: '75%'}}>
                        <ListGroupItemHeading>{item.manufacturer} {item.modelNumber}</ListGroupItemHeading>
                        <ListGroupItemText>
                          Price: {item.price}
                        </ListGroupItemText>
                        <Button color='danger' style={{marginTop: 10}} onClick={() => this.props.deleteFromCart(item.modelNumber)}>REMOVE</Button>
                      </div>
                      <div>
                        <h4>Amount:</h4>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                          <h2 style={{marginRight: 15}}>{item.amount}</h2>
                          <div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fafaff', height: 25, width: 50, backgroundColor: '#1B998B', borderRadius: '10px 10px 0 0'}} onClick={() => this.props.increaseAmount(item.modelNumber)}><FontAwesomeIcon icon="plus" /></div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fafaff', height: 25, width: 50, backgroundColor: '#eb6565', borderRadius: '0 0 10px 10px'}} onClick={() => this.props.decreaseAmount(item.modelNumber)}><FontAwesomeIcon icon="minus" /></div>
                          </div>
                        </div>
                        </div>
                    </ListGroupItem>
                  )
                })
              }
            </ListGroup>
            :
            <h4>You don't have anything in your cart yet...</h4>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>Continue <FontAwesomeIcon icon="cash-register" /></Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default Checkout;
