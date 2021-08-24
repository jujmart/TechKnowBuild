import React from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
	return (
		<nav>
			<Link to="/" exact={true}>
				TechKnowBuild
			</Link>
			<NavLink to="/login" exact={true} activeClassName="active">
				Login
			</NavLink>
			<NavLink to="/sign-up" exact={true} activeClassName="active">
				Sign Up
			</NavLink>
			<LogoutButton />
		</nav>
	);
};

export default NavBar;
