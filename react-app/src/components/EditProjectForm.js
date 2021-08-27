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

	async function handleSubmit(e) {
		e.preventDefault();

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
				<select
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option>Please select a category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label>Project Image</label>
				<input
					type="file"
					name="project_support-image"
					accept=".pdf,.png,.jpg,.jpeg,.gif"
					onChange={(e) => setProjectSupport(e.target.files[0])}
				/>
				<button>Update Project</button>
			</form>
		</div>
	);
}
