import React, { Component } from 'react';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer/Footer';
import ItemList from './Components/ItemList';
import Checkout from './Components/Checkout';
import { Spinner, Button, Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FloatingButton from './Components/FloatingButton';
import './App.css';

const base64 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];
const manufacturers = ['Robot.ly', 'CRobot', 'burobot', 'sonobot', 'acrobot', 'roboticc', 'frobotix', 'YouRobot', 'DroBots', 'Robop', 'RoBright', 'iRobot', 'RoBord', 'BuzzBot'];

// Alert component for user feedback
const ActionAlert = (props) => {
  return (
    <Alert
      style={{position: 'fixed', zIndex: 1, top: 100, left: 0}}
      color={props.data.type}
      isOpen={props.visible}
      toggle={props.dismissAlert}
    >
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
  }

  // toggle the Checkout modal
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
    // Check if item already exists in cart
    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].modelNumber === item.modelNumber) {
        // If it does give user feedback and return
        this.showAlert({ message: 'You already have that robot in your cart', type: 'danger' });
        return;
      }
    }

    // If it doesn't: add it
    this.setState(prevState => ({
      cart: [...prevState.cart, item]
    }), () => this.showAlert({ message: 'Item was added to cart', type: 'success' }))
  }

  deleteFromCart = (modelNumber) => {
    this.setState({
      cart: this.state.cart.filter(item => item.modelNumber !== modelNumber)
    }, () => this.showAlert({ message: 'Item was removed from cart', type: 'success' }))
  }

  increaseAmount = (modelNumber) => {
    let itemIndex;
    this.state.cart.forEach((robot, i) => {
      if (robot.modelNumber === modelNumber) {
        itemIndex = i;
      }
    })
    let items = [...this.state.cart];
    let item = {...items[itemIndex]};
    item.amount++;
    items[itemIndex] = item;
    this.setState({ cart: items })
  }

  decreaseAmount = (modelNumber) => {
    let itemIndex;
    this.state.cart.forEach((robot, i) => {
      if (robot.modelNumber === modelNumber) {
        itemIndex = i;
      }
    })
    let items = [...this.state.cart];
    let item = {...items[itemIndex]};
    if (item.amount <= 1) {
      return;
    }
    item.amount--;
    items[itemIndex] = item;
    this.setState({ cart: items })
  }

  // Generate a random model number for the robot
  modelGenerator = () => {
    let modelNumber = '';
    const rand = Math.floor(Math.random() * 2) + 3;
    for (let i = 0; i < rand; i++) {
      modelNumber += base64[Math.floor(Math.random() * 64)];
    }
    return modelNumber;
  }

  // Select a random manufacturer from the array
  getManufacturer = () => {
    return manufacturers[Math.floor(Math.random() * manufacturers.length)];
  }

  // Set a random price
  getPrice = () => {
    return Math.floor(Math.random() * 500) * 5 + 750
  }

  // calculate Total for the robots in the cart
  calculateTotal = () => {
    const pricePerItems = this.state.cart.map(item => {
      return item.price * item.amount;
    })

    return pricePerItems.reduce((acc, cur) => acc + cur, 0);
  }

  // Load robots (12). Gets 12 lines of bacon ipsum from the json api and then
  // generate a robot object for each line
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
            description: item,
            amount: 1
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
    const { alertData, visible, items, isPending, cart, modal } = this.state;
    return (
      <div className="App">
        <Navigation toggle={this.toggle} />
        <ActionAlert data={alertData} visible={visible} dismissAlert={this.dismissAlert} />
        <div id='productPageHeader'>
          <div id='bgImage'></div>
          <div id='productPageHeaderTitle'>
            <h1 style={{fontSize: '4em'}}>Find Your New Robot!</h1>
            <h1 style={{fontSize: '3em'}}>TODAY <FontAwesomeIcon icon="robot" /></h1>
          </div>
        </div>
        <div style={{marginTop: 400}} className='customContainer'>
          {
            items
            &&
            <ItemList
              items={items}
              addToCart={this.addToCart}
            />
          }
          {
            isPending
            ?
            <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
            :
            <Button
              size="lg"
              style={{marginBottom: 75}}
              onClick={this.getMoreRobots}
              color="info"
            >
              Load More Robots
            </Button>
          }
        </div>
        <FloatingButton toggle={this.toggle} />
        <Checkout
          toggle={this.toggle}
          cart={cart}
          modal={modal}
          deleteFromCart={this.deleteFromCart}
          increaseAmount={this.increaseAmount}
          decreaseAmount={this.decreaseAmount}
          total={this.calculateTotal}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
