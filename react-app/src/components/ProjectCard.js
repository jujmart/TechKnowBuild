import { useSelector } from "react-redux";
import "./css/ProjectCard.css";

export function ProjectCard({ projectId }) {
	const projects = useSelector((state) => state.projects);
	const project_supports = useSelector((state) => state.project_supports);

	const currentProject = projects[projectId];
	let firstSupportId = null;
	for (let i = 0; i < currentProject?.project_supportIds.length; i++) {
		let currentProject_SupportId = currentProject.project_supportIds[i];
		if (
			project_supports[currentProject_SupportId]?.projectSupportType ===
			"image"
		) {
			firstSupportId = currentProject_SupportId;
			break;
		}
	}

	return (
		<div className="project-card_container">
			{firstSupportId && (
				<img
					className="project-card_image"
					src={project_supports[firstSupportId]?.projectSupportUrl}
					alt="Project Img"
				/>
			)}
			<div className="project-card_text-container">
				<div className="project-card_title">
					{currentProject?.title}
				</div>
				<div className="project-card_username">
					By {currentProject?.username}
				</div>
			</div>
		</div>
	);
}
