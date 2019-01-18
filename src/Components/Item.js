import React, { Component } from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import question from '../Revision_quetionmark_icon.png';

class Item extends Component {
  constructor() {
    super();

    this.state = {
      imageStatus: 'pending'
    }
  }

  handleImageError = () => {
    this.setState({ imageStatus: 'error' })
  }

  handleImageLoaded = () => {
    this.setState({ imageStatus: 'loaded' })
  }

  render() {
    const { imageStatus } = this.state;
    const { id, manufacturer, modelNumber, description, addToCart } = this.props; 
    return (
      <Card>
        {
          imageStatus !== 'error'
          &&
          <CardImg top width="100%" height="100%"
            src={`https://robohash.org/${id}?size=200x200`}
            onError={this.handleImageError}
            onLoad={this.handleImageLoaded}
            alt="Card image cap"
          />
        }
        {
          imageStatus === 'pending'
          &&
          <div>
            <CardImg top width="100%"
              src={question}
            />
            <Spinner type="grow" color="info" />
          </div>
        }
        {
          imageStatus === 'error'
          &&
          <div>
            <CardImg top width="100%"
              src={question}
            />
            <p>Couldn't get image...</p>
          </div>
        }
        <CardBody style={{textAlign: 'left'}}>
          <CardTitle><strong>{manufacturer} {modelNumber}</strong></CardTitle>
          <CardText>{description}</CardText>
          <CardText className='text-muted'><strong>Manufacturer: </strong>{manufacturer}</CardText>
          <CardText className='text-muted'><strong>Model Number: </strong>{modelNumber}</CardText>
          <CardText className='text-muted'><strong>Price: </strong>{this.props.price}</CardText>
          <Button onClick={() => addToCart(this.props)} style={{backgroundColor: '#1B998B', border: 'none'}}>Add To Cart <FontAwesomeIcon icon="cart-plus" /></Button>
        </CardBody>
      </Card>
    )
  }
}

export default Item;
