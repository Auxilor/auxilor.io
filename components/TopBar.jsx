import { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from "../styles/TopBar/style.module.css"

const TopBar = () => {
  
  const [showEditors, setShowEditors] = useState(false);
	const showEditorDropdown = (e)=>{
		setShowEditors(!showEditors);
	}
	const hideEditorDropdown = (e) => {
		setShowEditors(false);
	}

	const [showPlugins, setShowPlugins] = useState(false);
	const showPluginDropdown = (e) => {
		setShowPlugins(!showEditors);
	}
	const hidePluginDropdown = (e) => {
		setShowPlugins(false);
	}
  const router = useRouter()
  
  console.log(router.pathname.toLowerCase())
  let BrandImage;

  switch (router.pathname.toLowerCase()) {
    case "/editors/ecoarmor":
      BrandImage = (
      <Image
        src="/assets/EcoArmor@x128.png"
        width="32"
        height="32"
        className="d-inline-block align-top"
        alt="EcoArmor"
        id="navbar-logo"
      />)
      break;
    case "/editors/ecobosses":
      BrandImage = (
        <Image
          src="/assets/EcoBosses@x128.png"
          width="32"
          height="32"
          className="d-inline-block align-top"
          alt="EcoBosses"
          id="navbar-logo"
        />)
        break;
    default:
      BrandImage = (
        <Image
          src="/assets/Auxilor@x256.jpeg"
          width="32"
          height="32"
          className="d-inline-block align-top"
          alt="Auxilor logo"
          id="navbar-logo"
        />)
      break;
  }

  return (
    <Navbar bg="light">
      <Navbar.Brand href="/">
        {
          BrandImage
        }
      </Navbar.Brand>
      <Navbar.Brand href="/">Auxilor</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            title="Plugins"
            id="Plugins-dropdown"
            onMouseEnter={showPluginDropdown}
            onMouseLeave={hidePluginDropdown}
            show={showPlugins}
            className={style.marginRight}
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
          <NavDropdown
            title="Editors"
            id="Editor-Dropdown"
            onMouseEnter={showEditorDropdown}
            onMouseLeave={hideEditorDropdown}
            show={showEditors}
            className={style.marginRight}
          >
            <NavDropdown.Item
              // href="/editors/EcoArmor"
              as="li"
              aria-label="Item > Link"
              >
              <Link
                href="/editors/EcoArmor"
              >
              EcoArmor
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item
              // href="/editors/EcoBosses"
              as="li"
              aria-label="Item > Link"
            >
              <Link
                href="/editors/EcoBosses"
              >
              EcoBosses
              </Link>
            </NavDropdown.Item>

          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar