import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { deleteCommentThunk, editCommentThunk } from "../store/comment";

import "./css/Comment.css";

export default function Comment({ commentId, setCurrentCommentIds }) {
	const comment = useSelector((state) => state.comments[commentId]);
	const user = useSelector((state) => state.session.user);
	const [showButtonId, setShowButtonId] = useState(0);
	const [showEditCommentId, setShowEditCommentId] = useState(0);
	const [updatedComment, setUpdatedComment] = useState("");
	const [editCommentErrors, setEditCommentErrors] = useState([]);
	const dispatch = useDispatch();

	function handleUpdatedTime() {
		const t = comment.updatedAt.split(/[ :]/);
		const monthObj = {
			Jan: 0,
			Feb: 1,
			Mar: 2,
			Apr: 3,
			May: 4,
			Jun: 5,
			Jul: 6,
			Aug: 7,
			Sep: 8,
			Oct: 9,
			Nov: 10,
			Dec: 11,
		};
		const updatedTime = new Date(
			Date.UTC(t[3], monthObj[t[2]], t[1], t[4], t[5], t[6])
		);
		const currentTime = new Date();
		const difference = currentTime - updatedTime;

		if (difference < 60 * 1000) {
			return "< 1m";
		} else if (difference < 60 * 60 * 1000) {
			return `${Math.floor(difference / (60 * 1000))}m`;
		} else if (difference < 24 * 60 * 60 * 1000) {
			return `${Math.floor(difference / (60 * 60 * 1000))}h`;
		} else if (difference < 30 * 24 * 60 * 60 * 1000) {
			return `${Math.floor(difference / (24 * 60 * 60 * 1000))}d`;
		} else if (difference < 12 * 30 * 24 * 60 * 60 * 1000) {
			return `${Math.floor(difference / (30 * 24 * 60 * 60 * 1000))}mo`;
		}
		return `${Math.floor(difference / (12 * 30 * 24 * 60 * 60 * 1000))}y`;
	}

	async function handleDeleteComment() {
		const response = await dispatch(deleteCommentThunk(comment.id));
		if (!response) {
			setCurrentCommentIds((prevState) =>
				prevState.filter((commentId) => commentId !== comment.id)
			);
		}
	}

	async function handleEditComment() {
		if (!updatedComment) {
			setEditCommentErrors(["Cannot add an empty comment"]);
			return;
		}
		const response = await dispatch(
			editCommentThunk(
				{
					projectId: comment.projectId,
					content: updatedComment,
				},
				commentId
			)
		);
		if (response) {
			setEditCommentErrors(response.errors);
		} else {
			setEditCommentErrors([]);
			setShowEditCommentId(0);
		}
	}

	return (
		<div
			className="comment_container"
			onMouseEnter={() => setShowButtonId(comment?.id)}
			onMouseLeave={() => setShowButtonId(0)}
		>
			<div className="comment_user-info-buttons-container">
				<div className="comment_user-info">
					<img
						src={comment?.profilePhotoUrl}
						alt="Profile Img"
						className="comment_profile-photo"
					/>
					<div className="comment_username">{comment?.username}</div>
					<div className="comment_updatedAt">
						{comment ? handleUpdatedTime() : null}
					</div>
				</div>
				<div>
					{comment?.userId === user?.id &&
					showButtonId === comment?.id ? (
						<>
							<span
								onClick={() => {
									setShowEditCommentId(comment.id);
									setUpdatedComment(comment.content);
								}}
								className="comment_edit-icon"
							>
								<FontAwesomeIcon icon={faEdit} />
							</span>
							<span
								onClick={handleDeleteComment}
								className="comment_delete-icon"
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</span>
						</>
					) : null}
				</div>
			</div>
			{showEditCommentId !== comment?.id ? (
				<div className="comment_content">{comment?.content}</div>
			) : (
				<div>
					{editCommentErrors.length ? (
						<ul className="errors-ul add-width">
							{editCommentErrors.map((editCommentError) => (
								<li
									key={editCommentError}
									className="errors-li"
								>
									{editCommentError}
								</li>
							))}
						</ul>
					) : null}
					<textarea
						placeholder="Update comment"
						value={updatedComment}
						onChange={(e) => setUpdatedComment(e.target.value)}
						className="comment_update-content"
					/>
					<button
						onClick={handleEditComment}
						className="comment_update-button"
					>
						Update Comment
					</button>
					<button
						onClick={() => {
							setShowEditCommentId(0);
							setEditCommentErrors([]);
						}}
						className="comment_update-cancel-button"
					>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
}
