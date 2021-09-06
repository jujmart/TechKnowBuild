import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createStepThunk } from "../store/steps";

import "./css/StepForm.css";

export function StepForm({ setShowStepForm, setCurrentStepIds }) {
	const dispatch = useDispatch();
	const { projectId } = useParams();
	const [title, setTitle] = useState("");
	const [instruction, setInstruction] = useState("");
	const [stepSupport, setStepSupport] = useState(null);
	const [errors, setErrors] = useState([]);

	const imageFileExts = ["png", "jpg", "jpeg"];

	async function handleSubmit(e) {
		e.preventDefault();

		let imageData = new FormData();
		if (stepSupport) {
			const imageNameSplit = stepSupport.name.split(".");
			const imageExt = imageNameSplit[imageNameSplit.length - 1];
			if (!imageFileExts.includes(imageExt.toLowerCase())) {
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

		const response = await dispatch(createStepThunk(imageData, stepData));
		if (response.errors) {
			setErrors(response.errors);
		} else {
			setCurrentStepIds((prevState) => [...prevState, response.id]);
			setShowStepForm(false);
		}
	}

	return (
		<div className="project-form_form-container">
			<div className="step-form_form">
				<h1 className="project-form_header">Add a Step</h1>
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
						accept=".png,.jpg,.jpeg"
						onChange={(e) => setStepSupport(e.target.files[0])}
					/>
				</div>
				<button onClick={handleSubmit} className="step-form_submit-btn">
					Add Step
				</button>
				<button
					onClick={() => setShowStepForm(false)}
					className="step-form_cancel-btn"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
