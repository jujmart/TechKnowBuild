import "./css/ProjectForm.css";

export function ProjectForm() {
	return (
		<div className="project-form_form-container">
			<form className="project-form_form">
				<input type="text" name="title" placeholder="Title" required />
				<input
					type="text"
					name="description"
					placeholder="Description"
					required
				/>
				<label>Project Image</label>
				<input type="file" name="project_support-image" required />
			</form>
		</div>
	);
}
