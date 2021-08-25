import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
	};

	return (
		<span className="navbar_logout" onClick={onLogout}>
			Log Out
		</span>
	);
};

export default LogoutButton;
