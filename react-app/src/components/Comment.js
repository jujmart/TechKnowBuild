import { useSelector } from "react-redux";

import "./css/Comment.css";

export default function Comment({ commentId, setCurrentCommentIds }) {
	const comment = useSelector((state) => state.comments[commentId]);

	return (
		<div className="comment_container">
			<div className="comment_user-info">
				<img
					src={comment?.profilePhotoUrl}
					alt="Profile Img"
					className="comment_profile-photo"
				/>
				<div className="comment_username">{comment?.username}</div>
				<div className="comment_updatedAt">{comment?.updatedAt}</div>
			</div>
			<div className="comment_content">{comment?.content}</div>
		</div>
	);
}
