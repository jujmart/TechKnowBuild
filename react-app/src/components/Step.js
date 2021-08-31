import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from "../context/Modal";
import { setClose, setShowDeleteStepConfirm } from "../store/modal";
import { getSomeStep_Supports } from "../store/step_supports";
import { DeleteStepConfirmForm } from "./DeleteStepConfirmForm";
import { EditStepForm } from "./EditStepForm";

import "./css/Step.css";

export function Step({ stepId, stepNum, setCurrentStepIds }) {
	const { projectId } = useParams();
	const step = useSelector((state) => state.steps[stepId]);
	const step_supports = useSelector((state) => state.step_supports);
	const user = useSelector((state) => state.session.user);
	const project = useSelector((state) => state.projects[projectId]);
	const deleteConfirm = useSelector((state) => state.modal.deleteStep);
	const [showEditStep, setShowEditStep] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (step) {
			const step_supportIds = [];
			step.step_supportIds.forEach((step_supportId) => {
				if (!step_supportIds.includes(step_supportId)) {
					step_supportIds.push(step_supportId);
				}
			});
			if (step_supportIds.length) {
				dispatch(getSomeStep_Supports(step_supportIds));
			}
		}
	}, [dispatch, step]);

	return showEditStep !== stepId ? (
		<div div className="project_content-container">
			<h3 className="step_header">
				Step {stepNum}: {step?.title}
			</h3>
			{user?.id === project?.userId && (
				<div className="step_btn-container">
					<button
						onClick={() => setShowEditStep(true)}
						className="project_edit-btn"
					>
						Edit
					</button>
					<button
						onClick={() =>
							dispatch(setShowDeleteStepConfirm(stepId))
						}
						className="project_delete-btn"
					>
						Delete
					</button>
					{deleteConfirm === stepId ? (
						<Modal onClose={() => dispatch(setClose())}>
							<DeleteStepConfirmForm
								stepId={stepId}
								setCurrentStepIds={setCurrentStepIds}
							/>
						</Modal>
					) : null}
				</div>
			)}
			<div className="project_project-support-images_container">
				{step?.step_supportIds.map((stepSupportId) =>
					step_supports[stepSupportId]?.stepSupportType ===
					"image" ? (
						<img
							className="project_project-support-image"
							src={step_supports[stepSupportId]?.stepSupportUrl}
							alt="Step Img"
							key={stepSupportId}
						/>
					) : null
				)}
			</div>
			<div className="step_instruction">{step?.instruction}</div>
		</div>
	) : (
		<EditStepForm />
	);
}
