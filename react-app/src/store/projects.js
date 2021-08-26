// constants
const SET_PROJECTS = "projects/SET_PROJECTS";

const setProjects = (projects) => ({
	type: SET_PROJECTS,
	projects,
});

export const getSomeProjects = (projectIds) => async (dispatch) => {
	const response = await fetch(`/api/projects/`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(projectIds),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(setProjects(data.projects));
	}
};

const initialState = {};

export default function reducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case SET_PROJECTS:
			const newSetState = {};
			action.projects.forEach((project) => {
				newSetState[project.id] = project;
			});
			return newSetState;
		default:
			return state;
	}
}
