import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getAllCategories } from "../store/categories";
import { editProjectThunk, getProjectById } from "../store/projects";
import "./css/ProjectForm.css";

export function EditProjectForm() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { projectId } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [projectSupport, setProjectSupport] = useState(null);
	const [categoryId, setCategoryId] = useState(0);
	const [errors, setErrors] = useState([]);
	const categories = useSelector((state) => state.categories);
	const project = useSelector((state) => state.projects[projectId]);
	const user = useSelector((state) => state.session.user);

	const imageFileExts = ["pdf", "png", "jpg", "jpeg", "gif"];

	async function handleSubmit(e) {
		e.preventDefault();

		if (projectSupport) {
			const imageNameSplit = projectSupport.name.split(".");
			const imageExt = imageNameSplit[imageNameSplit.length - 1];
			if (!imageFileExts.includes(imageExt)) {
				setErrors(["File type not permitted"]);
				return;
			}
		}

		let imageData = new FormData();
		if (projectSupport) {
			imageData.set("image", projectSupport);
		} else {
			imageData = null;
		}

		const projectData = {
			title,
			description,
		};

		const response = await dispatch(
			editProjectThunk(imageData, projectData, categoryId, projectId)
		);
		if (response.errors) {
			setErrors(response.errors);
		} else {
			history.push(`/projects/${projectId}`);
		}
	}

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	useEffect(() => {
		if (!project) {
			dispatch(getProjectById(projectId));
		}
	}, [dispatch, project, projectId]);

	useEffect(() => {
		setTitle(project?.title);
		setDescription(project?.description);
		setCategoryId(
			categories.find(
				(category) => category.name === project?.categories[0]
			)?.id
		);
	}, [project, categories]);

	if (project && user.id !== project.userId) {
		return <Redirect to="/" />;
	}

	return (
		<div className="project-form_form-container">
			<form className="project-form_form" onSubmit={handleSubmit}>
				<h1 className="project-form_header">Edit a Project!</h1>
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
						Project Image
					</label>
					<input
						type="file"
						name="project_support-image"
						className="project-form_project-image-input"
						accept=".pdf,.png,.jpg,.jpeg,.gif"
						onChange={(e) => setProjectSupport(e.target.files[0])}
					/>{" "}
				</div>
				<button className="project-form_update-btn">
					Update Project
				</button>
			</form>
		</div>
	);
}
