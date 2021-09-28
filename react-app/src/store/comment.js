const SET_COMMENTS = "comments/SET_COMMENTS";

const setComments = (comments) => ({
	type: SET_COMMENTS,
	comments,
});

export const getSomeComments = (commentIds) => async (dispatch) => {
	const response = await fetch(`/api/comments/`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(commentIds),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(setComments(data.comments));
	}
};

const initialState = {};

export default function commentReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SET_COMMENTS:
			const newSetState = {};
			action.comments.forEach((comment) => {
				newSetState[comment.id] = comment;
			});
			return newSetState;
		// case ADD_STEP:
		// 	const newAddState = { ...state };
		// 	newAddState[action.step.id] = action.step;
		// 	return newAddState;
		default:
			return state;
	}
}
