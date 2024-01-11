import React from 'react';
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./MenuComponent.css";
import image from './image.jpg';

function MenuComponent() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavLinkClick = (to) => {
        navigate(to);
    };

    // Function to determine if the Nav.Link is active based on the current location
    const isNavLinkActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div>
            <Navbar expand="lg" className="custom-navbar">
                <Container>
                    <Navbar.Brand>
                        <Image
                            src={image}
                            alt="Logo"
                            className="custom-logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto texte">
                            <Nav.Link
                                as={Link}
                                to="/Clients"
                                onClick={() => handleNavLinkClick('/Clients')}
                                className={`custom-nav-link ${isNavLinkActive('/Clients') ? 'active' : ''}`}
                            >
                                Clients Management
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/Rooms"
                                onClick={() => handleNavLinkClick('/Rooms')}
                                className={`custom-nav-link ${isNavLinkActive('/Rooms') ? 'active' : ''}`}
                            >
                                Rooms Management
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/Booking"
                                onClick={() => handleNavLinkClick('/Booking')}
                                className={`custom-nav-link ${isNavLinkActive('/Booking') ? 'active' : ''}`}
                            >
                                Booking
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default MenuComponent;
