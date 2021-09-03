import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/categories";
import { getSomeProjects } from "../store/projects";
import { getSomeProject_Supports } from "../store/project_supports";
import { ProjectCard } from "./ProjectCard";
import "./css/Home.css";

export function Home() {
	const categories = useSelector((state) => state.categories);
	const projects = useSelector((state) => state.projects);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	useEffect(() => {
		if (categories.length) {
			const projectIds = [];
			categories.forEach((category) => {
				for (let i = 0; i < category.projectIds.length; i++) {
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
			if (project_supportIds.length) {
				dispatch(getSomeProject_Supports(project_supportIds));
			}
		}
	}, [dispatch, projects]);

	return (
		<div className="home_container">
			<div className="home_splash">
				<h1 className="home_splash-header">
					Welcome to TechKnowBuild!
				</h1>
				<h2 className="home_splash-text">
					Here you can find and share ways to make your favorite
					technological items!
				</h2>
				<h3 className="home_splash-text">
					Sharing your build is as easy as creating a project and
					adding some build steps!
				</h3>
			</div>
			<div className="home_content_container">
				<h1>Explore Projects</h1>
				{categories.map((category) => (
					<div key={category.id} className="home_category-conatiner">
						<h2 className="home_category-title">{category.name}</h2>
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
		</div>
	);
}
