import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/categories";
import { getSomeProjects } from "../store/projects";
import { getSomeProject_Supports } from "../store/project_supports";
import { ProjectCard } from "./ProjectCard";

export function Home() {
	const categories = useSelector((state) => state.categories);
	const projects = useSelector((state) => state.projects);
	const dispatch = useDispatch();
	fetch("/api/categories");

	useEffect(() => {
		// dispatch(getAllCategories());
	}, [dispatch]);

	useEffect(() => {
		if (categories.length) {
			const projectIds = [];
			categories.forEach((category) => {
				for (let i = 0; i < 5; i++) {
					if (!projectIds.includes(category.projectIds[i])) {
						projectIds.push(category.projectIds[i]);
					}
				}
			});
			dispatch(getSomeProjects(projectIds));
		}
	}, [dispatch, categories]);

	useEffect(() => {
		if (Object.values(projects).length) {
			const project_supportIds = [];
			Object.values(projects).forEach((project) => {
				project.project_supportIds.forEach((project_supportId) => {
					if (!project_supportIds.includes(project_supportId)) {
						project_supportIds.push(project_supportId);
					}
				});
			});
			dispatch(getSomeProject_Supports(project_supportIds));
		}
	}, [dispatch, projects]);

	return (
		<div className="home_container">
			<h1>Explore Projects</h1>
			{categories.map((category) => (
				<div key={category.id} className="home_category-conatiner">
					<h2>{category.name}</h2>
					<div className="home_project-card-container">
						{category.projectIds.map((projectId) => (
							<ProjectCard
								key={projectId}
								projectId={projectId}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
