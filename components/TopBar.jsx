import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'next/image'

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Navbar bg="light">
        <Navbar.Brand href="/">
          <Image
            src="/assets/256x256.jpeg"
            width="32"
            height="32"
            className="d-inline-block align-top"
            alt="Auxilor logo"
            id="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/">Auxilor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="Plugins"
              id="basic-nav-dropdown"
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              show={isOpen}
              noCaret
            >
              <NavDropdown.Header>Spigot</NavDropdown.Header>
              <NavDropdown.Item
                href="https://www.spigotmc.org/resources/79573/"
                target="_blank"
              >
                EcoEnchants
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://www.spigotmc.org/resources/88246/"
                target="_blank"
              >
                EcoArmor
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://www.spigotmc.org/resources/86576/"
                target="_blank"
              >
                EcoBosses
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://www.spigotmc.org/resources/87377/"
                target="_blank"
              >
                Talismans
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://www.spigotmc.org/resources/88247/"
                target="_blank"
              >
                StatTrackers
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>Polymart</NavDropdown.Header>
              <NavDropdown.Item
                href="https://polymart.org/resource/490/"
                target="_blank"
              >
                EcoEnchants
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://polymart.org/resource/687/"
                target="_blank"
              >
                EcoArmor
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://polymart.org/resource/525/"
                target="_blank"
              >
                EcoBosses
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://polymart.org/resource/611/"
                target="_blank"
              >
                Talismans
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://polymart.org/resource/623/"
                target="_blank"
              >
                StatTrackers
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
