import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editStepThunk } from "../store/steps";

import "./css/StepForm.css";

export function EditStepForm({ stepId, setShowEditStep }) {
	const dispatch = useDispatch();
	const { projectId } = useParams();
	const step = useSelector((state) => state.steps[stepId]);
	const [title, setTitle] = useState(step.title);
	const [instruction, setInstruction] = useState(step.instruction);
	const [stepSupport, setStepSupport] = useState(null);
	const [errors, setErrors] = useState([]);

	const imageFileExts = ["pdf", "png", "jpg", "jpeg", "gif"];

	async function handleSubmit(e) {
		e.preventDefault();

		let imageData = new FormData();
		if (stepSupport) {
			const imageNameSplit = stepSupport.name.split(".");
			const imageExt = imageNameSplit[imageNameSplit.length - 1];
			if (!imageFileExts.includes(imageExt)) {
				setErrors(["File type not permitted"]);
				return;
			}
			imageData.set("image", stepSupport);
		} else {
			imageData = null;
		}

		const stepData = {
			title,
			instruction,
			projectId,
		};

		const response = await dispatch(
			editStepThunk(imageData, stepData, stepId)
		);
		if (response.errors) {
			setErrors(response.errors);
		} else {
			setShowEditStep(0);
		}
	}

	return (
		<div className="project-form_form-container">
			<div className="step-form_form">
				<h1 className="project-form_header">Update Step</h1>
				{errors.length ? (
					<ul className="errors-ul">
						{errors.map((error) => (
							<li key={error} className="errors-li">
								{error}
							</li>
						))}
					</ul>
				) : null}
				<input
					type="text"
					name="title"
					placeholder="Title"
					required
					className="project-form_title-input"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					name="instruction"
					placeholder="Instruction"
					required
					className="project-form_description-input"
					value={instruction}
					onChange={(e) => setInstruction(e.target.value)}
				/>
				<div className="project-form_project-image-div">
					<label className="project-form_project-image-label">
						Step Image:
					</label>
					<input
						type="file"
						name="step_support-image"
						className="project-form_project-image-input"
						accept=".pdf,.png,.jpg,.jpeg,.gif"
						onChange={(e) => setStepSupport(e.target.files[0])}
					/>
				</div>
				<button onClick={handleSubmit} className="step-form_update-btn">
					Update Step
				</button>
				<button
					onClick={() => setShowEditStep(0)}
					className="step-form_cancel-btn"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
