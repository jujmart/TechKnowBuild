import { useSelector } from "react-redux";

export default function Comment({ commentId, setCurrentCommentIds }) {
	const comment = useSelector((state) => state.comments[commentId]);

	return <div>comment.id</div>;
}
