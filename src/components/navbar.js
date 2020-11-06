import React, { Component } from 'react'
import { Nav,Navbar } from 'react-bootstrap'

class Header extends Component {
  render(){
    return (
        <Navbar className ="px-2" collapseOnSelect expand="lg" 
          style = {{
            borderBottom : "2px solid #e6f7dc",
            height : "50px"
          }}
        >
          <Navbar.Brand href="/">
            <span
                style = {{
                  color : "#6FA843",
                  fontSize : "20px",
                  fontWeight : "500"
                }}
            >
              GTA-Simulator
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{ fontWeight: "600" }}>
              <Nav className="mr-auto" ></Nav>
              <Nav>
                <Nav.Link eventKey={1} href = '/visualiser'>Algo Visualiser</Nav.Link>  
                <Nav.Link eventKey={2} href = '/path_finder'>Path Finder</Nav.Link>                 
                <Nav.Link eventKey={2} href='/game_coloring'>Coloring Game</Nav.Link>                 
                <Nav.Link eventKey={3} href= '/covid_simulation'>Covid Simulation</Nav.Link>
              </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default Header