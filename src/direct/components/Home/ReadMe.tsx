import Markdown from "react-markdown";
import markdown from "./readMeBody.md?raw";
import "./readMe.scss";

export default function ReadMe() {
	return (
		<div className="readme-body text-left space-y-4">
			<Markdown>{markdown}</Markdown>
		</div>
	);
}
