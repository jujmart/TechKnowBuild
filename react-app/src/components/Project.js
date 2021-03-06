import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../context/Modal";
import { setClose, setShowDeleteProjectConfirm } from "../store/modal";
import { getProjectById } from "../store/projects";
import { getSomeProject_Supports } from "../store/project_supports";
import { getSomeSteps } from "../store/steps";
import { DeleteProjectConfirmForm } from "./DeleteProjectConfirmForm";
import { Step } from "./Step";
import { StepForm } from "./StepForm";
import { createCommentThunk, getSomeComments } from "../store/comment";
import Comment from "./Comment";

import "./css/Project.css";

export function Project() {
	const { projectId } = useParams();
	const project = useSelector((state) => state.projects[projectId]);
	const project_supports = useSelector((state) => state.project_supports);
	const deleteConfirm = useSelector((state) => state.modal.deleteProject);
	const user = useSelector((state) => state.session.user);
	const [showStepForm, setShowStepForm] = useState(false);
	const [currentStepIds, setCurrentStepIds] = useState([]);
	const [currentCommentIds, setCurrentCommentIds] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [commentErrors, setCommentErrors] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleEditProject() {
		history.push(`/edit-project/${projectId}`);
	}

	async function handleAddComment() {
		if (!newComment) {
			setCommentErrors(["Cannot add an empty comment"]);
			return;
		}
		const response = await dispatch(
			createCommentThunk({ projectId, content: newComment })
		);
		if (response.errors) {
			setCommentErrors(response.errors);
		} else {
			setCurrentCommentIds((prevState) => [...prevState, response.id]);
			setCommentErrors([]);
			setNewComment("");
		}
	}

	useEffect(() => {
		dispatch(getProjectById(projectId));
	}, [dispatch, projectId]);

	useEffect(() => {
		if (project) {
			const project_supportIds = [];
			project.project_supportIds.forEach((project_supportId) => {
				if (!project_supportIds.includes(project_supportId)) {
					project_supportIds.push(project_supportId);
				}
			});
			if (project_supportIds.length) {
				dispatch(getSomeProject_Supports(project_supportIds));
			}
		}
	}, [dispatch, project]);

	useEffect(() => {
		if (project) {
			const stepIds = [];
			project.stepIds.forEach((stepId) => {
				if (!stepIds.includes(stepId)) {
					stepIds.push(stepId);
				}
			});
			if (stepIds.length) {
				dispatch(getSomeSteps(stepIds));
			}

			const commentIds = [];
			project.commentIds.forEach((commentId) => {
				if (!commentIds.includes(commentId)) {
					commentIds.push(commentId);
				}
			});
			if (commentIds.length) {
				dispatch(getSomeComments(commentIds));
			}
		}
	}, [dispatch, project]);

	useEffect(() => {
		if (project) {
			setCurrentStepIds(project.stepIds);
			setCurrentCommentIds(project.commentIds);
		}
	}, [project]);

	return (
		<div className="project_container">
			<div className="project_content-container">
				<h1 className="project_title">{project?.title}</h1>
				{user?.id === project?.userId && (
					<div>
						<button
							onClick={handleEditProject}
							className="project_edit-btn"
						>
							Edit
						</button>
						<button
							onClick={() =>
								dispatch(setShowDeleteProjectConfirm())
							}
							className="project_delete-btn"
						>
							Delete
						</button>
						{deleteConfirm ? (
							<Modal onClose={() => dispatch(setClose())}>
								<DeleteProjectConfirmForm
									projectId={projectId}
								/>
							</Modal>
						) : null}
					</div>
				)}
				<div className="project_username">By {project?.username}</div>
				<div className="project_project-support-images_container">
					{project?.project_supportIds.map((projectSupportId) =>
						project_supports[projectSupportId]
							?.projectSupportType === "image" ? (
							<img
								className="project_project-support-image"
								src={
									project_supports[projectSupportId]
										?.projectSupportUrl
								}
								alt="Project Img"
								key={projectSupportId}
							/>
						) : null
					)}
				</div>
				<div className="project_description">
					{project?.description}
				</div>
				<div className="step_container">
					{currentStepIds.map((stepId, stepNum) => (
						<Step
							key={stepId}
							stepId={stepId}
							stepNum={stepNum + 1}
							setCurrentStepIds={setCurrentStepIds}
						/>
					))}
				</div>
				{user?.id === project?.userId &&
					(!showStepForm ? (
						<button
							onClick={() => setShowStepForm(true)}
							className="step_add-btn"
						>
							Add a step
						</button>
					) : (
						<StepForm
							setShowStepForm={setShowStepForm}
							setCurrentStepIds={setCurrentStepIds}
						/>
					))}
				<div className="project_comment-container">
					<h2 className="project_comment-header">
						{currentCommentIds.length} Comments
					</h2>
					{currentCommentIds.map((commentId) => (
						<Comment
							key={commentId}
							commentId={commentId}
							setCurrentCommentIds={setCurrentCommentIds}
						/>
					))}
					{user ? (
						<div className="project_comment-add_container">
							{commentErrors.length ? (
								<ul className="errors-ul add-width2">
									{commentErrors.map((commentError) => (
										<li
											key={commentError}
											className="errors-li"
										>
											{commentError}
										</li>
									))}
								</ul>
							) : null}
							<textarea
								placeholder="Add a comment"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								className="project_comment-add-content"
							/>
							<button
								onClick={handleAddComment}
								className="project_comment-add-button"
							>
								Add Comment
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
