import type { ChangeEvent } from "react";

type UploadInputProps = {
	setFile: (file: File) => void;
};

export default function UploadInput(props: UploadInputProps) {
	const { setFile } = props;

	const handleUploadMessage = (e: ChangeEvent<HTMLInputElement>) => {
		const curFile = e.currentTarget?.files?.[0];
		if (curFile) {
			setFile(curFile);
		}
	};

	return (
		<input
			type="file"
			className="cover-upload-component__upload-input"
			onChange={handleUploadMessage}
		/>
	);
}
