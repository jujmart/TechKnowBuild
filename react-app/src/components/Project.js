import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectById } from "../store/projects";
import { getSomeProject_Supports } from "../store/project_supports";
import "./css/Project.css";

export function Project() {
	const { projectId } = useParams();
	const project = useSelector((state) => state.projects[projectId]);
	const project_supports = useSelector((state) => state.project_supports);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!project) {
			dispatch(getProjectById(projectId));
		}
	}, [dispatch, projectId, project]);

	useEffect(() => {
		if (project) {
			const project_supportIds = [];
			project.project_supportIds.forEach((project_supportId) => {
				if (!project_supportIds.includes(project_supportId)) {
					project_supportIds.push(project_supportId);
				}
			});
			dispatch(getSomeProject_Supports(project_supportIds));
		}
	}, [dispatch, project]);

	return (
		<div className="project_container">
			<div className="project_content-container">
				<h1 className="project_title">{project?.title}</h1>
				{project?.project_supportIds.map((projectSupportId) =>
					project_supports[projectSupportId]?.projectSupportType ===
					"image" ? (
						<img
							className="project_image"
							src={
								project_supports[projectSupportId]
									?.projectSupportUrl
							}
							alt="Project Img"
						/>
					) : null
				)}
				<div className="project_text-container">
					<div className="project_username">
						By {project?.username}
					</div>
				</div>
			</div>
		</div>
	);
}
