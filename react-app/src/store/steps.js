import { addStep_Supports } from "./step_supports";

// constants
const SET_STEPS = "steps/SET_STEPS";
const ADD_STEP = "steps/ADD_STEP";

const setSteps = (steps) => ({
	type: SET_STEPS,
	steps,
});

const addStep = (step) => ({
	type: ADD_STEP,
	step,
});

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

export const deleteStepThunk = (stepId) => async (dispatch) => {
	const SQLresponse = await fetch(`/api/steps/${stepId}`, {
		method: "DELETE",
	});

	if (SQLresponse.ok) {
		const SQLdata = await SQLresponse.json();
		if (SQLdata.errors) {
			return SQLdata;
		}
	}
};

export const editStepThunk = (imageData, data, stepId) => async (dispatch) => {
	const SQLresponse = await fetch(`/api/steps/${stepId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (SQLresponse.ok) {
		const SQLdata = await SQLresponse.json();
		if (SQLdata.errors) {
			return SQLdata;
		}

		if (imageData) {
			let AWSResponse;
			if (SQLdata.step.step_supportIds[0]) {
				AWSResponse = await fetch(
					`/api/step_supports/AWS/${SQLdata.step.step_supportIds[0]}`,
					{
						method: "PUT",
						body: imageData,
					}
				);
			} else {
				AWSResponse = await fetch(
					`/api/step_supports/AWS/${SQLdata.step.id}`,
					{
						method: "POST",
						body: imageData,
					}
				);
			}

			if (AWSResponse.ok) {
				const AWSData = await AWSResponse.json();
				if (AWSData.errors) {
					return AWSData;
				}
				dispatch(addStep_Supports([AWSData.stepSupport]));
				SQLdata.step.step_supportIds = [AWSData.stepSupport.id];
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
		default:
			return state;
	}
}
