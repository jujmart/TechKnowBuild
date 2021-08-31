const SHOW_LOGIN = "/modal/SHOW_LOGIN";
const SHOW_SIGNUP = "/modal/SHOW_SIGNUP";
const SHOW_DELETE_PROJECT_CONFIRM = "/modal/SHOW_DELETE_PROJECT_CONFIRM";
const SHOW_DELETE_STEP_CONFIRM = "/modal/SHOW_DELETE_STEP_CONFIRM";
const CLOSE = "/modal/CLOSE";

export function setShowLogin() {
	return { type: SHOW_LOGIN };
}

export function setShowSignup() {
	return { type: SHOW_SIGNUP };
}

export function setShowDeleteProjectConfirm() {
	return { type: SHOW_DELETE_PROJECT_CONFIRM };
}

export function setShowDeleteStepConfirm(id) {
	return { type: SHOW_DELETE_STEP_CONFIRM, id };
}

export function setClose() {
	return { type: CLOSE };
}

const initialState = {
	login: null,
	signup: null,
	deleteProject: null,
	deleteStep: null,
};

export default function modalReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SHOW_LOGIN:
			return {
				login: true,
				signup: null,
				deleteProject: null,
				deleteStep: null,
			};
		case SHOW_SIGNUP:
			return {
				login: null,
				signup: true,
				deleteProject: null,
				deleteStep: null,
			};
		case SHOW_DELETE_PROJECT_CONFIRM:
			return {
				login: null,
				signup: null,
				deleteProject: true,
				deleteStep: null,
			};
		case SHOW_DELETE_STEP_CONFIRM:
			return {
				login: null,
				signup: null,
				deleteProject: null,
				deleteStep: action.id,
			};
		case CLOSE:
			return {
				login: null,
				signup: null,
				deleteProject: null,
				deleteStep: null,
			};
		default:
			return state;
	}
}
