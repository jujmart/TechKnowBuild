import { useSelector } from "react-redux";

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
		<div>
			{firstSupportId && (
				<img
					src={project_supports[firstSupportId]?.projectSupportUrl}
					alt="Project Img"
				/>
			)}
			<div>{currentProject?.title}</div>
		</div>
	);
}
