import React, {useState} from 'react';
import {
  Button,
  ButtonGroup, Collapse,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand, NavbarToggler
} from "reactstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

const Header = ({rSelect, defaults, sortBy}) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color="light" light expand='lg'>
      <NavbarBrand href="#">
        <NavLink className={'nav-link'} to="/">Alpha Centauri</NavLink>
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="me-2"/>
      <Collapse isOpen={!collapsed} navbar>
        <Nav className="mr-auto filter" navbar>
          {rSelect}
        </Nav>
        <Nav className="ml-auto sorter" navbar>
          <ButtonGroup className='navbar-sorting'>
            <InputGroupText className='navbar-sorting__heading'>Sort by</InputGroupText>
            <Button onClick={defaults}>Default</Button>
            <Button onClick={() => sortBy('nameSort')}>Name</Button>
            <Button onClick={() => sortBy('maxTempSort')}>
              Max temperature</Button>
            <Button onClick={() => sortBy('minTempSort')}>
              Min temperature</Button>
          </ButtonGroup>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

function mapStateToProps() {

}

export default connect(mapStateToProps)(Header);