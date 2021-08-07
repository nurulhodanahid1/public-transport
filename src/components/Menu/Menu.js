import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Menu = () => {
    const [verifiedUser, setVerifiedUser] = useContext(UserContext);
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
                            {
                                verifiedUser.email ? <Link to="/home"><Button className="login-button" onClick={()=>setVerifiedUser({})} variant="primary">Logout</Button></Link>
                                : <Link to="login"><Button className="login-button">Login</Button></Link>
                            }
                            {
                                verifiedUser.name && <Navbar.Text>
                                Signed in as: <Link to="/profile">{verifiedUser.name}</Link>
                            </Navbar.Text>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;