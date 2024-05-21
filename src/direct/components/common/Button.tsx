import type { MouseEvent, PropsWithChildren } from "react";

interface PropsWithClassName extends PropsWithChildren {
	className?: string;
	onClick: (e: MouseEvent) => void;
}

export default function Button(props: PropsWithClassName) {
	return (
		<button
			{...props}
			onClick={props.onClick}
			className={`p-4 rounded-lg ${props.className}`}
		>
			{props.children}
		</button>
	);
}
