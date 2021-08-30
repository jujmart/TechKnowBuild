import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { setClose, setShowLogin } from "../../store/modal";
import { signUp } from "../../store/session";
import "../css/SignUpForm.css";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password !== repeatPassword) {
			setErrors(["Passwords must match"]);
		} else {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				dispatch(setClose());
			}
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onSignUp} className="signup_form">
			<h2 className="signup_form-header">Sign Up!</h2>
			{errors.length ? (
				<ul className="errors-ul">
					{errors.map((error, ind) => (
						<li key={ind} className="errors-li">
							{error}
						</li>
					))}
				</ul>
			) : null}
			<input
				type="text"
				name="username"
				onChange={updateUsername}
				value={username}
				required
				placeholder="Username"
				className="signup_username-input"
			></input>
			<input
				type="email"
				name="email"
				onChange={updateEmail}
				value={email}
				required
				placeholder="Email"
				className="signup_email-input"
			></input>
			<input
				type="password"
				name="password"
				onChange={updatePassword}
				value={password}
				required
				placeholder="Password"
				className="signup_password-input"
			></input>
			<input
				type="password"
				name="repeat_password"
				onChange={updateRepeatPassword}
				value={repeatPassword}
				required={true}
				placeholder="Repeat Password"
				className="signup_password-input"
			></input>
			<button type="submit" className="signup_submit-btn">
				Sign Up
			</button>
			<div className="signup_extra-text">
				Already a member?{" "}
				<span
					className="signup_switch-modals"
					onClick={() => dispatch(setShowLogin())}
				>
					Log In
				</span>
			</div>
		</form>
	);
};

export default SignUpForm;
