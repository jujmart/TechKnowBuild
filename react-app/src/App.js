import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { authenticate } from "./store/session";
import { Home } from "./components/Home";
import { Project } from "./components/Project";
import { ProjectForm } from "./components/CreateProjectForm";
import { EditProjectForm } from "./components/EditProjectForm";
import { About } from "./components/About";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<Home />
				</Route>
				<Route path="/projects/:projectId" exact={true}>
					<Project />
				</Route>
				<ProtectedRoute path="/create-project" exact={true}>
					<ProjectForm />
				</ProtectedRoute>
				<ProtectedRoute path="/edit-project/:projectId" exact={true}>
					<EditProjectForm />
				</ProtectedRoute>
			</Switch>
			<About />
		</BrowserRouter>
	);
}

export default App;
