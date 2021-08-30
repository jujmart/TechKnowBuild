import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "../context/Modal";
import { setClose, setShowLogin, setShowSignup } from "../store/modal";
import { login } from "../store/session";
import LoginForm from "./auth/LoginForm";
import LogoutButton from "./auth/LogoutButton";
import SignUpForm from "./auth/SignUpForm";
import "./css/NavBar.css";

const NavBar = () => {
	const user = useSelector((state) => state.session.user);
	const { signup } = useSelector((state) => state.modal);
	const loginNow = useSelector((state) => state.modal.login);
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
						<span
							className="navbar_login"
							onClick={() => dispatch(setShowLogin())}
						>
							Log In
						</span>
						{loginNow ? (
							<Modal onClose={() => dispatch(setClose())}>
								<LoginForm />
							</Modal>
						) : null}
						<span className="navbar_break">|</span>
						<span
							className="navbar_signup"
							onClick={() => dispatch(setShowSignup())}
						>
							Sign Up
						</span>
						{signup ? (
							<Modal onClose={() => dispatch(setClose())}>
								<SignUpForm />
							</Modal>
						) : null}
					</>
				) : (
					<>
						<Link
							to="/create-project"
							className="navbar_create-project"
						>
							Create Project
						</Link>
						<span className="navbar_break">|</span>
						<LogoutButton />
						<span className="navbar_break">|</span>
						<span>Hello, {user.username}</span>
					</>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
