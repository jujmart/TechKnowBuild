// constants
const SET_STEPS = "steps/SET_STEPS";
// const UPDATE_PROJECT_SUPPORT = "project_supports/UPDATE_PROJECT_SUPPORT";

const setSteps = (steps) => ({
	type: SET_STEPS,
	steps,
});

// export const updateProject_Support = (project_support) => ({
// 	type: UPDATE_PROJECT_SUPPORT,
// 	project_support,
// });

export const getSomeSteps = (stepIds) => async (dispatch) => {
	const response = await fetch(`/api/steps/`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(stepIds),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(setSteps(data.steps));
	}
};

const initialState = {};

export default function reducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SET_STEPS:
			const newSetState = {};
			action.steps.forEach((step) => {
				newSetState[step.id] = step;
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
