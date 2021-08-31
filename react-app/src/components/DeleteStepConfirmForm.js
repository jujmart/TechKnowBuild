import { useDispatch, useSelector } from "react-redux";
import { setClose } from "../store/modal";
import { deleteStepThunk } from "../store/steps";

export function DeleteStepConfirmForm({ stepId, setCurrentStepIds }) {
	const dispatch = useDispatch();
	const step = useSelector((state) => state.steps[stepId]);

	async function handleDeleteStep() {
		const response = await dispatch(deleteStepThunk(stepId));
		if (!response) {
			setCurrentStepIds((prevState) => {
				const idx = prevState.indexOf(stepId);
				if (idx !== -1) {
					return [
						...prevState.slice(0, idx),
						...prevState.slice(idx + 1),
					];
				} else {
					return prevState;
				}
			});
		}
		dispatch(setClose());
	}

	return (
		<div className="login_form">
			<h2 className="delete_form-header">
				Are you sure you want to delete the following step?
				{"\n\n" + step.title}
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
