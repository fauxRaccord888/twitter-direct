import type { KeyboardEvent, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { resetConversations } from "../../store/reducers/conversation";
import { isValidKeyupEvent, isValidMouseEvent } from "../../function";

export default function ResetButton() {
	const dispatch = useDispatch();

	const onReset = (e: MouseEvent | KeyboardEvent) => {
		const isValidKey = isValidKeyupEvent(e, "Enter");
		const isValidMouse = isValidMouseEvent(e);

		if (isValidKey || isValidMouse) {
			const response = window.confirm(
				"진행할 경우 설정한 모든 대화 이름과 숨김처리가 초기화됩니다. 계속하시겠습니까?",
			);
			if (response) {
				dispatch(resetConversations());
			}
		}
	};

	return (
		<div
			onClick={onReset}
			onKeyUp={onReset}
			className="p-4 w-1/2 cursor-pointer bg-red-800 rounded-2xl"
		>
			대화방 이름 및 숨김 처리 초기화
		</div>
	);
}
