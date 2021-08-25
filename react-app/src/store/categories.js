// constants
const SET_CATEGORIES = "categories/SET_CATEGORIES";

const setCategories = (categories) => ({
	type: SET_CATEGORIES,
	categories,
});

export const getAllCategories = () => async (dispatch) => {
	const response = await fetch("/api/categories");

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(setCategories(data.categories));
	}
};

const initialState = [];

export default function reducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SET_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
}
