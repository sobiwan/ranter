import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import currentUser from "../store/reducers/currentUser";
import {logout} from "../store/actions/auth";
import Logo from "../images/ranter-logo.png"

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar=brand">
                            <img src={Logo} alt="Ranter Home" />
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className="nav-navbar-nav navbar-right">
                            <li>
                                <Link to={`/users/${this.props.currentUser.id}/messages/new`}>New Rant</Link>
                            </li>
                            <li>
                                <a onClick={this.logout}>Log out</a>
                            </li>
                        </ul>
                    ):(
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                    </ul>
                    )}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, {logout})(Navbar);