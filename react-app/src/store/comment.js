const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";

const setComments = (comments) => ({
	type: SET_COMMENTS,
	comments,
});

const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment,
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

export const createCommentThunk = (data) => async (dispatch) => {
	const SQLresponse = await fetch(`/api/comments/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (SQLresponse.ok) {
		const SQLdata = await SQLresponse.json();
		if (SQLdata.errors) {
			return SQLdata;
		}

		dispatch(addComment(SQLdata.comment));
		return SQLdata.comment;
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
		case ADD_COMMENT:
			const newAddState = { ...state };
			newAddState[action.comment.id] = action.comment;
			return newAddState;
		default:
			return state;
	}
}
