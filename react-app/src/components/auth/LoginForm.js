import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { setShowSignup } from "../../store/modal";
import { login } from "../../store/session";
import "../css/LoginForm.css";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onLogin} className="login_form">
			<h2 className="login_form-header">Log In!</h2>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<input
				name="email"
				type="email"
				placeholder="Email"
				value={email}
				onChange={updateEmail}
				className="login_email-input"
				required
			/>
			<input
				name="password"
				type="password"
				placeholder="Password"
				value={password}
				onChange={updatePassword}
				required
				className="login_password-input"
			/>
			<button type="submit" className="login_submit-btn">
				Log In
			</button>
			<div className="login_extra-text">
				Not a member?{" "}
				<span
					className="login_switch-modals"
					onClick={() => dispatch(setShowSignup())}
				>
					Sign Up
				</span>
			</div>
		</form>
	);
};

export default LoginForm;
