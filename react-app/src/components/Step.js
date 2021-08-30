import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSomeStep_Supports } from "../store/step_supports";

export function Step({ stepId, stepNum }) {
	const step = useSelector((state) => state.steps[stepId]);
	const step_supports = useSelector((state) => state.step_supports);
	const dispatch = useDispatch();

	useEffect(() => {
		if (step) {
			const step_supportIds = [];
			step.step_supportIds.forEach((step_supportId) => {
				if (!step_supportIds.includes(step_supportId)) {
					step_supportIds.push(step_supportId);
				}
			});
			dispatch(getSomeStep_Supports(step_supportIds));
		}
	}, [dispatch, step]);

	return (
		<div>
			<h3>
				Step {stepNum}: {step?.title}
			</h3>
			<div className="project_project-support-images_container">
				{step?.step_supportIds.map((stepSupportId) =>
					step_supports[stepSupportId]?.stepSupportType ===
					"image" ? (
						<img
							className="project_project-support-image"
							src={step_supports[stepSupportId]?.stepSupportUrl}
							alt="Step Img"
							key={stepSupportId}
						/>
					) : null
				)}
			</div>
			<div>{step?.instruction}</div>
		</div>
	);
}
