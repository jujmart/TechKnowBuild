import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import categories from "./categories";
import projects from "./projects";
import project_supports from "./project_supports";
import modal from "./modal";
import steps from "./steps";
import step_supports from "./step_supports";

const rootReducer = combineReducers({
	session,
	categories,
	projects,
	project_supports,
	modal,
	steps,
	step_supports,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
