import React, { Component } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer/Footer';
import ItemList from './Components/ItemList';
import { Spinner, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FloatingButton from './Components/FloatingButton';
import './App.css';

const base64 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
const manufacturers = ['Robot.ly', 'CRobot', 'burobot', 'sonobot', 'acrobot', 'roboticc', 'frobotix', 'YouRobot', 'DroBots', 'Robop', 'RoBright', 'iRobot', 'RoBord', 'BuzzBot'];

const ActionAlert = (props) => {
  return (
    <Alert style={{position: 'fixed', zIndex: 1, top: 100, left: 0}} color={props.data.type} isOpen={props.visible} toggle={props.dismissAlert}>
      {props.data.message}
    </Alert>
  )
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      isPending: false,
      items: [],
      modal: false,
      cart: [],
      visible: false,
      alertData: {
        message: '',
        type: ''
      }
    }

    let timeout;
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  dismissAlert = () => {
    clearTimeout(this.timeout)
    this.setState({ visible: false })
  }

  showAlert = (alertData) => {
    this.setState({ visible: true, alertData }, () => (this.timeout = setTimeout(() => {
      this.dismissAlert();
    }, 3000)))
  }

  addToCart = (item) => {
    this.setState(prevState => ({
      cart: [...prevState.cart, item]
    }), () => this.showAlert({ message: 'Item was added to cart', type: 'success' }))
  }

  deleteFromCart = (modelNumber) => {
    this.setState({
      cart: this.state.cart.filter(item => item.modelNumber !== modelNumber)
    }, () => this.showAlert({ message: 'Item was removed from cart', type: 'success' }))
  }

  modelGenerator = () => {
    let modelNumber = '';
    const rand = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < rand; i++) {
      modelNumber += base64[Math.floor(Math.random() * 64)];
    }
    return modelNumber;
  }

  getManufacturer = () => {
    return manufacturers[Math.floor(Math.random() * manufacturers.length)];
  }

  getPrice = () => {
    return Math.floor(Math.random() * 500) * 5 + 750
  }

  getMoreRobots = () => {
    this.setState({ isPending: true });
    fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=12&start-with-lorem=1')
      .then(res => res.json())
      .then(data => {
        const newItems = data.map(item => {
          return ({
            manufacturer: this.getManufacturer(),
            modelNumber: this.modelGenerator(),
            price: this.getPrice(),
            description: item
          })
        })
        this.setState(prevState => ({
          isPending: false,
          items: [...prevState.items, ...newItems]
        }))
      })
  }

  componentDidMount() {
    this.getMoreRobots();
  }
  render() {
    return (
      <div className="App">
        <Navigation toggle={this.toggle} />
        <ActionAlert data={this.state.alertData} visible={this.state.visible} dismissAlert={this.dismissAlert} />
        <div id='productPageHeader'>
          <div id='bgImage'></div>
          <div id='productPageHeaderTitle'>
            <h1 style={{fontSize: '4em'}}>Find Your New Robot!</h1>
            <h1 style={{fontSize: '3em'}}>TODAY <FontAwesomeIcon icon="robot" /></h1>
          </div>
        </div>
        <div style={{marginTop: 400}} className='customContainer'>
          {
            this.state.items
            &&
            <ItemList
              items={this.state.items}
              addToCart={this.addToCart}
            />
          }
          {
            this.state.isPending
            ?
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            :
            <Button size="lg" style={{marginBottom: 75}} onClick={this.getMoreRobots} color="info">Load More Robots</Button>
          }
        </div>
        <FloatingButton toggle={this.toggle} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Checkout</ModalHeader>
          <ModalBody>
            {
              this.state.cart.length
              ?
              <ListGroup>
                {
                  this.state.cart.map(item => {
                    return (
                      <ListGroupItem key={item.modelNumber} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '75%'}}>
                          <ListGroupItemHeading>{item.manufacturer} {item.modelNumber}</ListGroupItemHeading>
                          <ListGroupItemText>
                            Price: {item.price}
                          </ListGroupItemText>
                        </div>
                        <Button color='danger' style={{marginTop: 10}} onClick={() => this.deleteFromCart(item.modelNumber)}>REMOVE</Button>
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
            <Button color="primary" onClick={this.toggle}>Continue <FontAwesomeIcon icon="cash-register" /></Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default App;
