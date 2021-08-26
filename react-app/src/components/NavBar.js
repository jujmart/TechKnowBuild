import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { login } from "../store/session";
import LogoutButton from "./auth/LogoutButton";
import "./css/NavBar.css";

const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const DemoLogin = async () => {
		await dispatch(login("demo@aa.io", "password"));
	};

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
						<span onClick={DemoLogin} className="navbar_demo">
							Demo User
						</span>
						<span className="navbar_break">|</span>
						<NavLink
							to="/login"
							exact={true}
							activeClassName="active"
							className="navbar_login"
						>
							Log In
						</NavLink>
						<span className="navbar_break">|</span>
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
