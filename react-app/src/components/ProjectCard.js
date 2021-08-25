import { useSelector } from "react-redux";

export function ProjectCard({ projectId }) {
	const projects = useSelector((state) => state.projects);

	return (
		<div>
			{/* <img src={projects[projectId]?.} /> */}
			<div>{projects[projectId]?.title}</div>
		</div>
	);
}
