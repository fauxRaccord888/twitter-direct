import example from "../../../assets/example.js?raw";

export default function Example() {
	const onDownload = () => {
		const blob = new Blob([example], { type: "text/javascript" });
		const link = window.URL.createObjectURL(blob);
		const linkElem = document.createElement("a");
		linkElem.href = link;
		linkElem.setAttribute("download", "example.js");
		linkElem.click();
	};

	return (
		<div className="flex flex-col whitespace-pre-wrap text-left space-y-8 pb-24">
			<p>
				트위터에서 제공하는 "direct-messages.js"는 아래와 같은 형식으로
				제공됩니다
			</p>
			<p>
				아카이브 요청이 진행 중이거나 미리 확인해보고자 하는 경우, 예시 파일을
				다운로드 후 확인해보세요
			</p>
			<button
				type="button"
				onClick={onDownload}
				className="bg-sky-800 p-4 rounded-2xl w-72"
			>
				예시 파일 다운로드
			</button>

			<h2 className="text-3xl">예시 JSON</h2>
			<p>{example}</p>
		</div>
	);
}
