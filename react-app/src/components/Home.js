import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/categories";
import { getSomeProjects } from "../store/projects";

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
				for (let i = 0; i < 5; i++) {
					if (!projectIds.includes(category.projectIds[i])) {
						projectIds.push(category.projectIds[i]);
					}
				}
			});
			dispatch(getSomeProjects(projectIds));
		}
	}, [dispatch, categories]);

	return (
		<div className="home_container">
			<h1>Explore Projects</h1>
			{categories.map((category) => (
				<div key={category.id} className="home_category-conatiner">
					<h2>{category.name}</h2>
					<div className="home_project-card-container">
						{category.projectIds.map((projectId) => (
							<div key={projectId}>
								{projects[projectId]?.title}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
