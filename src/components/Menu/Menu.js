import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Menu.css"

const Menu = () => {
    const [verifiedUser, setVerifiedUser] = useContext(UserContext);
    return (
        <div>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand><Link className="nav-brand" to="/">Public Transport</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link><Link className="menu-item" to="/home">Home</Link></Nav.Link>
                            <Nav.Link><Link className="menu-item" to="/destination/1">Destination</Link></Nav.Link>
                            <Nav.Link><Link className="menu-item" to="/block">Block</Link></Nav.Link>
                            <Nav.Link><Link className="menu-item" to="/contact">Contact</Link></Nav.Link>
                            {
                                verifiedUser.email ? <Link className="menu-btn" to="/home"><Button className="login-button" onClick={()=>setVerifiedUser({})} variant="primary">Logout</Button></Link>
                                : <Link className="menu-btn" to="login"><Button className="login-button">Login</Button></Link>
                            }
                            {
                                verifiedUser.name && <Navbar.Text>
                                    <Link style={{color:"#326FC7"}} className="profile" to="/profile">{verifiedUser.name}</Link>
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