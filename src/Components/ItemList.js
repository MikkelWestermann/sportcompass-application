import React from 'react';
import Item from './Item';
import { Container, Row, Col } from 'reactstrap';

const ItemList = props => {
  return (
    <Row>
      {
        props.items.map((item, i) => {
          return (
            <Col sm="12" md="6" lg="4" style={{margin: '50px 0'}} key={item.modelNumber}>
              <Item
                manufacturer={item.manufacturer}
                modelNumber={item.modelNumber}
                description={item.description}
                price={item.price}
                id={i}
                addToCart={props.addToCart}
              />
            </Col>
          )
        })
      }
    </Row>
  )
}

export default ItemList;
