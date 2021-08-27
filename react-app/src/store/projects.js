// constants
const SET_PROJECTS = "projects/SET_PROJECTS";
const ADD_PROJECT = "projects/ADD_PROJECT";

const setProjects = (projects) => ({
	type: SET_PROJECTS,
	projects,
});

const addProject = (project) => ({
	type: ADD_PROJECT,
	project,
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

export const getProjectById = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/projects/${projectId}`);

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(addProject(data.project));
	}
};

export const createProjectThunk =
	(imageData, data, categoryId) => async (dispatch) => {
		const SQLresponse = await fetch(
			`/api/projects/categories/${categoryId}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}
		);

		if (SQLresponse.ok) {
			const SQLdata = await SQLresponse.json();
			if (SQLdata.errors) {
				return SQLdata;
			}

			const AWSResponse = await fetch(
				`/api/project_supports/AWS/${SQLdata.projectId}`,
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
			}
			return SQLdata;
		}
	};

export const deleteProjectThunk = (projectId) => async (dispatch) => {
	const SQLresponse = await fetch(`/api/projects/${projectId}`, {
		method: "DELETE",
	});

	if (SQLresponse.ok) {
		const SQLdata = await SQLresponse.json();
		if (SQLdata.errors) {
			return SQLdata;
		}
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
		case ADD_PROJECT:
			const newAddState = { ...state };
			newAddState[action.project.id] = action.project;
			return newAddState;
		default:
			return state;
	}
}
