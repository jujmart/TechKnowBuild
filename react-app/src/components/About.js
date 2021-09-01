import "./css/About.css";

export function About() {
	return (
		<div className="footer_link-container">
			<a
				href="https://github.com/jujmart/TechKnowBuild"
				className="footer_links"
			>
				<img
					src="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/GitHub-Mark-64px.png"
					alt="Github Icon"
					className="footer_github-icon"
				/>
				TechKnowBuild Github Repository
			</a>
			<a href="https://github.com/jujmart" className="footer_links">
				<img
					src="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/GitHub-Mark-64px.png"
					alt="Github Icon"
					className="footer_github-icon"
				/>
				Justice's Github Profile
			</a>
			<a
				href="https://www.linkedin.com/in/justice-martin-34043340"
				className="footer_links"
			>
				<img
					src="https://techknowbuild.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/LI-In-Bug.png"
					alt="LinkedIn Icon"
					className="footer_linkedin-icon"
				/>
				Justice's LinkedIn Profile
			</a>
		</div>
	);
}
