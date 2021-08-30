// constants
const SET_PROJECT_SUPPORTS = "project_supports/SET_PROJECT_SUPPORTS";
const UPDATE_PROJECT_SUPPORT = "project_supports/UPDATE_PROJECT_SUPPORT";

const setProject_Supports = (project_supports) => ({
	type: SET_PROJECT_SUPPORTS,
	project_supports,
});

export const updateProject_Support = (project_support) => ({
	type: UPDATE_PROJECT_SUPPORT,
	project_support,
});

export const getSomeProject_Supports =
	(project_supportIds) => async (dispatch) => {
		const response = await fetch(`/api/project_supports/`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(project_supportIds),
		});

		if (response.ok) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
			dispatch(setProject_Supports(data.project_supports));
		}
	};

const initialState = {};

export default function reducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SET_PROJECT_SUPPORTS:
			const newSetState = {};
			action.project_supports.forEach((project_support) => {
				newSetState[project_support.id] = project_support;
			});
			return newSetState;
		case UPDATE_PROJECT_SUPPORT:
			const newUpdateState = { ...state };
			newUpdateState[action.project_support.id] = action.project_support;
			return newUpdateState;
		default:
			return state;
	}
}
