import type { Mode } from "../../types";
import Button from "../common/Button";

type NavBarProps = {
	mode: Mode;
	setMode: (mode: Mode) => void;
};
export default function NavBar(props: NavBarProps) {
	const { mode, setMode } = props;

	const onNavigateToConversation = () => {
		setMode("conversation");
	};

	const onNavigateToExample = () => {
		setMode("example");
	};

	const onNavigateToMain = () => {
		setMode("home");
	};

	const normalBg = "bg-gray-800";
	const selectedBg = "bg-blue-800";

	return (
		<div
			className="
            fixed bottom-0 
            w-full h-24  space-x-4 
            flex items-center justify-center
            text-sm
            bg-[#565656]
        "
		>
			<Button
				onClick={onNavigateToMain}
				className={`${mode === "home" ? selectedBg : normalBg}`}
			>
				홈
			</Button>
			<Button
				onClick={onNavigateToConversation}
				className={`${mode === "conversation" ? selectedBg : normalBg}`}
			>
				대화
			</Button>
			<Button
				onClick={onNavigateToExample}
				className={`${mode === "example" ? selectedBg : normalBg}`}
			>
				예시
			</Button>
		</div>
	);
}
