import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../store/categories";

export function Home() {
	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	return (
		<div className="home_container">
			<h1>Explore Projects</h1>
			{categories.map((category) => (
				<div key={category.id} className="home_category-conatiner">
					<h2>{category.name}</h2>
					<div className="home_project-card-container"></div>
				</div>
			))}
		</div>
	);
}
