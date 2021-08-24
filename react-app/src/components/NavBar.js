import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
	const user = useSelector((state) => state.session.user);

	return (
		<nav>
			<div>
				<Link to="/" className="navbar_logo">
					TechKnowBuild
				</Link>
			</div>
			<div>
				{!user ? (
					<>
						<NavLink
							to="/login"
							exact={true}
							activeClassName="active"
							className="navbar_login"
						>
							Login
						</NavLink>
						<NavLink
							to="/sign-up"
							exact={true}
							activeClassName="active"
							className="navbar_signup"
						>
							Sign Up
						</NavLink>
					</>
				) : (
					<LogoutButton />
				)}
			</div>
		</nav>
	);
};

export default NavBar;
