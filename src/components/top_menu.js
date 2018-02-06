import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class TopMenu extends Component {

  render() {
    const {selected_page} = this.props;
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/nearby" className={(selected_page === 'nearby') ? "active" : ""}>Nearby Shops</Link></li>
              <li><Link to="/preferred" className={(selected_page === 'preferred') ? "active" : ""}>My preferred shops</Link></li>
              <li><Link to="/logout">LogOut <i className="fa fa-sign-out" aria-hidden="true"></i></Link></li>
            </ul>
          </div>
      </div>
      </nav>
    )
  }
}

export default TopMenu
