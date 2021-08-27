import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProjectThunk } from "../store/projects";
import "./css/ProjectForm.css";

export function ProjectForm() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [projectSupport, setProjectSupport] = useState(null);
	const [errors, setErrors] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();

		const imageData = new FormData();
		imageData.set("image", projectSupport);

		const data = {
			title,
			description,
		};

		const response = await dispatch(createProjectThunk(imageData, data));
		if (response.errors) {
			setErrors(response.errors);
		} else {
			// history.push(`/projects/${projectId}`)
		}
	}

	return (
		<div className="project-form_form-container">
			<form className="project-form_form" onSubmit={handleSubmit}>
				{errors.length ? (
					<ul>
						{errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				) : null}
				<input
					type="text"
					name="title"
					placeholder="Title"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					name="description"
					placeholder="Description"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label>Project Image</label>
				<input
					type="file"
					name="project_support-image"
					required
					onChange={(e) => setProjectSupport(e.target.files[0])}
				/>
				<button>Create Project</button>
			</form>
		</div>
	);
}
