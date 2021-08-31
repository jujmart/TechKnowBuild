import { useDispatch } from "react-redux";
import { setClose } from "../store/modal";

export function DeleteStepConfirmForm({ stepId }) {
	const dispatch = useDispatch();

	async function handleDeleteStep() {
		// await dispatch(deleteStepThunk(stepId));
		dispatch(setClose());
	}

	return (
		<div className="login_form">
			<h2 className="login_form-header">
				Are you sure you want to delete this step?
			</h2>
			<div className="delete-confirm_button-container">
				<button
					className="project_delete-btn"
					onClick={handleDeleteStep}
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
