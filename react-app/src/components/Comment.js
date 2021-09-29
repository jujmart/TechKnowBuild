import { useSelector } from "react-redux";

import "./css/Comment.css";

export default function Comment({ commentId, setCurrentCommentIds }) {
	const comment = useSelector((state) => state.comments[commentId]);
	const user = useSelector((state) => state.session.user);

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

	return (
		<div className="comment_container">
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
					{comment?.userId === user?.id ? (
						<>
							<button>Edit</button>
							<button>Delete</button>
						</>
					) : null}
				</div>
			</div>
			<div className="comment_content">{comment?.content}</div>
		</div>
	);
}
