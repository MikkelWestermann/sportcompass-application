import React, { Component } from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg } from 'reactstrap';

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
    return (
      <Card>
        {
          this.state.imageStatus !== 'error'
          &&
          <CardImg top width="100%" height="100%"
            src={`https://robohash.org/${this.props.id}?size=200x200`}
            onError={this.handleImageError}
            onLoad={this.handleImageLoaded}
            alt="Card image cap"
          />
        }
        {
          this.state.imageStatus === 'pending' || this.state.imageStatus === 'error'
          &&
          <CardImg top width="100%"
            src={question}
          />
        }
        <CardBody style={{textAlign: 'left'}}>
          <CardTitle><strong>{this.props.manufacturer} {this.props.modelNumber}</strong></CardTitle>
          <CardText>{this.props.description}</CardText>
          <CardText className='text-muted'><strong>Manufacturer: </strong>{this.props.manufacturer}</CardText>
          <CardText className='text-muted'><strong>Model Number: </strong>{this.props.modelNumber}</CardText>
          <CardText className='text-muted'><strong>Price: </strong>{this.props.price}</CardText>
          <Button onClick={() => this.props.addToCart(this.props)} style={{backgroundColor: '#1B998B', border: 'none'}}>Add To Cart</Button>
        </CardBody>
      </Card>
    )
  }
}

export default Item;
