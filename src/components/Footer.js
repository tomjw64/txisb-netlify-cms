import React from 'react'
import { Link } from 'gatsby'

import logo from '../img/logo-white.png'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          <img
            src={logo}
            alt="TXISB logo"
          />
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div className="columns">
              <div className="column is-6">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/event">
                        <span>Event</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/schedule">
                        <span>Schedule</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/register">
                        <span>Register</span>
                      </Link>
                    </li>
                    <li>
                      <a
                        className="navbar-item"
                        href="/admin/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Admin
                      </a>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-6">
                <section className="site-info">
                  <span className="attribution-title">Attribution</span>
                  <ul>
                    <li>TXISB logo created by Elizabeth Christensen</li>
                    <li>Modified Sword and shoe icons originally created by Freepik</li>
                    <li>Modified Favicons originally created by Good Ware</li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
