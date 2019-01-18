import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
 } from 'reactstrap';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark fixed='top' expand="md">
          <NavbarBrand href="/">RoboShop</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Robots</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Outlet</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Model Year
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    2019
                  </DropdownItem>
                  <DropdownItem>
                    2018
                  </DropdownItem>
                  <DropdownItem>
                    2017
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button
                  onClick={this.props.toggle}
                  outline color="info"
                >
                  Checkout <FontAwesomeIcon icon="shopping-cart" />
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
