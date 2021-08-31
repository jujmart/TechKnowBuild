import { addStep_Supports } from "./step_supports";

// constants
const SET_STEPS = "steps/SET_STEPS";
const ADD_STEP = "steps/ADD_STEP";
// const UPDATE_PROJECT_SUPPORT = "project_supports/UPDATE_PROJECT_SUPPORT";

const setSteps = (steps) => ({
	type: SET_STEPS,
	steps,
});

const addStep = (step) => ({
	type: ADD_STEP,
	step,
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

export const createStepThunk = (imageData, data) => async (dispatch) => {
	const SQLresponse = await fetch(`/api/steps/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (SQLresponse.ok) {
		const SQLdata = await SQLresponse.json();
		if (SQLdata.errors) {
			return SQLdata;
		}

		if (imageData) {
			const AWSResponse = await fetch(
				`/api/step_supports/AWS/${SQLdata.step.id}`,
				{
					method: "POST",
					body: imageData,
				}
			);

			if (AWSResponse.ok) {
				const AWSData = await AWSResponse.json();
				if (AWSData.errors) {
					return AWSData;
				}
				dispatch(addStep_Supports([AWSData.stepSupport]));
				SQLdata.step.step_supportIds.push(AWSData.stepSupport.id);
			}
		}
		dispatch(addStep(SQLdata.step));
		return SQLdata.step;
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
		case ADD_STEP:
			const newAddState = { ...state };
			newAddState[action.step.id] = action.step;
			return newAddState;
		// case UPDATE_PROJECT_SUPPORT:
		// 	const newUpdateState = { ...state };
		// 	newUpdateState[action.project_support.id] = action.project_support;
		// 	return newUpdateState;
		default:
			return state;
	}
}
