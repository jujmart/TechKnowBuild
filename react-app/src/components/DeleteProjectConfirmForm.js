import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setClose } from "../store/modal";
import { deleteProjectThunk } from "../store/projects";

export function DeleteProjectConfirmForm({ projectId }) {
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleDeleteProject() {
		await dispatch(deleteProjectThunk(projectId));
		dispatch(setClose());
		history.push("/");
	}

	return (
		<div className="login_form">
			<h2 className="login_form-header">
				Are you sure you want to delete this project?
			</h2>
			<div className="delete-confirm_button-container">
				<button
					className="project_delete-btn"
					onClick={handleDeleteProject}
				>
					Delete
				</button>
				<button
					className="project_cancel-btn"
					onClick={() => dispatch(setClose())}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
