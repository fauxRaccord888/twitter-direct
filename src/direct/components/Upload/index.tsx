import type { DMConversation } from "../../types";
import UploadInput from "./UploadInput";

type UploadProps = {
	file: File | null;
	conversations: DMConversation[] | null;
	setFile: (f: File) => void;
};

export default function Upload(props: UploadProps) {
	const { file, conversations, setFile } = props;
	return (
		<>
			{!file && <div>파일을 업로드해주세요</div>}
			{file && !conversations && (
				<div>올바른 형식의 파일을 업로드 해주세요.</div>
			)}
			{(!file || !conversations) && <UploadInput setFile={setFile} />}
		</>
	);
}
