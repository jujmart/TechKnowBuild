const SHOW_LOGIN = "/modal/SHOW_LOGIN";
const SHOW_SIGNUP = "/modal/SHOW_SIGNUP";
const SHOW_DELETE_CONFIRM = "/modal/SHOW_DELETE_CONFIRM";
const CLOSE = "/modal/CLOSE";

export function setShowLogin() {
	return { type: SHOW_LOGIN };
}

export function setShowSignup() {
	return { type: SHOW_SIGNUP };
}

export function setShowDeleteConfirm() {
	return { type: SHOW_DELETE_CONFIRM };
}

export function setClose() {
	return { type: CLOSE };
}

const initialState = { login: null, signup: null, delete: null };

export default function modalReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SHOW_LOGIN:
			return { login: true, signup: null, delete: null };
		case SHOW_SIGNUP:
			return { login: null, signup: true, delete: null };
		case SHOW_DELETE_CONFIRM:
			return { login: null, signup: null, delete: true };
		case CLOSE:
			return { login: null, signup: null, delete: null };
		default:
			return state;
	}
}
