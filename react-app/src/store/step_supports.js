// constants
const ADD_STEP_SUPPORTS = "step_supports/ADD_STEP_SUPPORTS";
// const UPDATE_PROJECT_SUPPORT = "project_supports/UPDATE_PROJECT_SUPPORT";

export const addStep_Supports = (step_supports) => ({
	type: ADD_STEP_SUPPORTS,
	step_supports,
});

// export const updateProject_Support = (project_support) => ({
// 	type: UPDATE_PROJECT_SUPPORT,
// 	project_support,
// });

export const getSomeStep_Supports = (step_supportIds) => async (dispatch) => {
	const response = await fetch(`/api/step_supports/`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(step_supportIds),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(addStep_Supports(data.step_supports));
	}
};

const initialState = {};

export default function reducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case ADD_STEP_SUPPORTS:
			const newSetState = { ...state };
			action.step_supports.forEach((step_support) => {
				newSetState[step_support.id] = step_support;
			});
			return newSetState;
		// case UPDATE_PROJECT_SUPPORT:
		// 	const newUpdateState = { ...state };
		// 	newUpdateState[action.project_support.id] = action.project_support;
		// 	return newUpdateState;
		default:
			return state;
	}
}
