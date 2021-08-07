import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Menu = () => {
    const [verifiedUser, setVerifiedUser] = useContext(UserContext)
    return (
        <div>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand><Link to="/">Public Transport</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                            <Nav.Link><Link to="/destination">Destination</Link></Nav.Link>
                            <Nav.Link><Link to="/block">Block</Link></Nav.Link>
                            <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
                            <Link to="login"><Button variant="primary">Login</Button></Link>
                            <Navbar.Text>
                                Signed in as: <Link to="/profile">{verifiedUser.name}</Link>
                            </Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;