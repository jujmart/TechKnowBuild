import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCategories } from "../store/categories";
import { createProjectThunk } from "../store/projects";
import "./css/ProjectForm.css";

export function ProjectForm() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [projectSupport, setProjectSupport] = useState(null);
	const [categoryId, setCategoryId] = useState(0);
	const [errors, setErrors] = useState([]);
	const categories = useSelector((state) => state.categories);

	const imageFileExts = ["png", "jpg", "jpeg"];

	async function handleSubmit(e) {
		e.preventDefault();

		if (!projectSupport) {
			setErrors(["Project image required"]);
			return;
		}

		const imageNameSplit = projectSupport.name.split(".");
		const imageExt = imageNameSplit[imageNameSplit.length - 1];
		if (!imageFileExts.includes(imageExt.toLowerCase())) {
			setErrors(["File type not permitted"]);
			return;
		}

		const imageData = new FormData();
		imageData.set("image", projectSupport);

		const projectData = {
			title,
			description,
		};

		const response = await dispatch(
			createProjectThunk(imageData, projectData, categoryId)
		);
		if (response.errors) {
			setErrors(response.errors);
		} else {
			history.push(`/projects/${response.projectId}`);
		}
	}

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	return (
		<div className="project-form_form-container">
			<form className="project-form_form" onSubmit={handleSubmit}>
				<h1 className="project-form_header">Create a Project!</h1>
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
					name="description"
					placeholder="Description"
					required
					className="project-form_description-input"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<select
					className="project-form_category-input"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option value={0}>Please select a category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<div className="project-form_project-image-div">
					<label className="project-form_project-image-label">
						Project Image:
					</label>
					<input
						type="file"
						name="project_support-image"
						required
						className="project-form_project-image-input"
						accept=".png,.jpg,.jpeg"
						onChange={(e) => setProjectSupport(e.target.files[0])}
					/>
				</div>
				<button className="project-form_submit-btn">
					Create Project
				</button>
			</form>
		</div>
	);
}
