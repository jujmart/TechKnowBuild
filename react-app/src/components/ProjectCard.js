import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
				<Link
					to={`/projects/${currentProject.id}`}
					className="project-card_link"
				>
					<img
						className="project-card_image"
						src={
							project_supports[firstSupportId]?.projectSupportUrl
						}
						alt="Project Img"
					/>
				</Link>
			)}
			<div className="project-card_text-container">
				<div className="project-card_title">
					{currentProject?.title.length > 23
						? currentProject?.title.slice(0, 20) + "..."
						: currentProject?.title}
				</div>
				<div className="project-card_username">
					By{" "}
					{currentProject?.username.length > 23
						? currentProject?.username.slice(0, 20) + "..."
						: currentProject?.username}
				</div>
			</div>
		</div>
	);
}
