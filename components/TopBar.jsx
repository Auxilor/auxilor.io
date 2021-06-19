import { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from '../styles/TopBar/style.module.css';

const TopBar = () => {
  const [showEditors, setShowEditors] = useState(false);

  const showEditorDropdown = () => {
    setShowEditors(!showEditors);
  };

  const hideEditorDropdown = () => {
    setShowEditors(false);
  };

  const [showPlugins, setShowPlugins] = useState(false);

  const showPluginDropdown = () => {
    setShowPlugins(!showEditors);
  };

  const hidePluginDropdown = () => {
    setShowPlugins(false);
  };

  const [showWikis, setShowWikis] = useState(false);

  const showWikiDropdown = () => {
    setShowWikis(!showEditors);
  };

  const hideWikiDropdown = () => {
    setShowWikis(false);
  };

  const router = useRouter();

  let BrandImage;

  switch (router.pathname.toLowerCase()) {
  case '/editor/ecoarmor':
    BrandImage = (
      <Image
        src="/assets/EcoArmor@x128.png"
        width="32"
        height="32"
        className="d-inline-block align-top"
        alt="EcoArmor"
        id="navbar-logo"
      />);
    break;
  case '/editor/ecobosses':
    BrandImage = (
      <Image
        src="/assets/EcoBosses@x128.png"
        width="32"
        height="32"
        className="d-inline-block align-top"
        alt="EcoBosses"
        id="navbar-logo"
      />);
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
      />);
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
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            title="Plugins"
            id="plugins-dropdown"
            onMouseEnter={showPluginDropdown}
            onMouseLeave={hidePluginDropdown}
            show={showPlugins}
            className={style.marginRight}
          >
            <NavDropdown.Header>Spigot</NavDropdown.Header>
            <NavDropdown.Item
              href="https://www.spigotmc.org/resources/79573/"
            >
              EcoEnchants
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://www.spigotmc.org/resources/88246/"
            >
              EcoArmor
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://www.spigotmc.org/resources/86576/"
            >
              EcoBosses
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://www.spigotmc.org/resources/87377/"
            >
              Talismans
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://www.spigotmc.org/resources/88247/"
            >
              StatTrackers
            </NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Header>Polymart</NavDropdown.Header>
            <NavDropdown.Item
              href="https://polymart.org/resource/490/"
            >
              EcoEnchants
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://polymart.org/resource/687/"
            >
              EcoArmor
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://polymart.org/resource/525/"
            >
              EcoBosses
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://polymart.org/resource/611/"
            >
              Talismans
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://polymart.org/resource/623/"
            >
              StatTrackers
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Wiki"
            id="wikis-dropdown"
            onMouseEnter={showWikiDropdown}
            onMouseLeave={hideWikiDropdown}
            show={showWikis}
            className={style.marginRight}
          >
            <NavDropdown.Item
              href="https://ecoenchants.willfp.com/"
            >
              EcoEnchants
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://ecoarmor.willfp.com/"
            >
              EcoArmor
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://ecobosses.willfp.com/"
            >
              EcoBosses
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://talismans.willfp.com/"
            >
              Talismans
            </NavDropdown.Item>
            <NavDropdown.Item
              href="https://stattrackers.willfp.com/"
            >
              StatTrackers
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Editors"
            id="editors-Dropdown"
            onMouseEnter={showEditorDropdown}
            onMouseLeave={hideEditorDropdown}
            show={showEditors}
            className={style.marginRight}
          >
            <NavDropdown.Item
              as="li"
              aria-label="Item > Link"
            >
              <Link
                href="/editor/ecoarmor"
              >
                EcoArmor
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item
              as="li"
              aria-label="Item > Link"
            >
              <Link
                href="/editor/ecobosses"
              >
                EcoBosses
              </Link>
            </NavDropdown.Item>

          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
