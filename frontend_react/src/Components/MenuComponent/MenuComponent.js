import React from 'react';
import {Container, Nav, Navbar,Image} from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import "./MenuComponent.css";
import image from './image.jpg';


function MenuComponent() {
    const navigate = useNavigate();
    const handleNavLinkClick = (to) => {
        navigate(to);
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
                                onClick={() => handleNavLinkClick('/Clients')}
                                className="text-white custom-nav-link"
                            >
                                Clients Management
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleNavLinkClick('/Rooms')}
                                className="text-white custom-nav-link"
                            >
                                Rooms Management
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleNavLinkClick('/Booking')}
                                className="text-white custom-nav-link"
                            >
                                Booking
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default MenuComponent;