import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import "./Header.css"
class Header extends React.Component {
    onClick = () => {
        const { setLogin } = this.props;
        setLogin('');
    }

    render() {
        return (
            <header className="header__box">
                <Nav>
                    <NavDropdown title="&#127828;">
                        <NavDropdown.Item eventKey="2" onClick={this.onClick}>Let me Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <span className="header__burger-desc">Click me</span>
                <span className="header__box-title">Chat Ninjas</span>
            </header>
        );
    }
}

export default Header;
