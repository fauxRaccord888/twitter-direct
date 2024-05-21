import type { KeyboardEvent, MouseEvent } from "react";
import type { DMConversation } from "../../types";
import type { AppRootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
	conversationSelector,
	deleteConversation,
	renameConversation,
} from "./../../store/reducers/conversation";
import { isValidKeyupEvent, isValidMouseEvent } from "../../function";
import Bin from "../../icon/Bin";
import Edit from "../../icon/Edit";

type ConversationComponentProps = {
	c: DMConversation;
	isCurConversation: boolean;
	setSelectedConversation: (c: DMConversation) => void;
};

export default function ConversationComponent(
	props: ConversationComponentProps,
) {
	const { c, isCurConversation, setSelectedConversation } = props;
	const conversation_STORE = useSelector((state: AppRootState) =>
		conversationSelector.selectById(state, c.dmConversation.conversationId),
	);
	const dispatch = useDispatch();

	const name = conversation_STORE
		? conversation_STORE.name
		: c.dmConversation.conversationId;
	const buttonClass = "w-8 h-8 stroke-white stroke-1.5";

	const onSelectConversation = (e: KeyboardEvent | MouseEvent) => {
		e.stopPropagation();
		const isValidKeyup = isValidKeyupEvent(e, "Enter");
		const isValidMouse = isValidMouseEvent(e);

		if (isValidKeyup || isValidMouse) {
			setSelectedConversation(c);
		}
	};

	const onRenameConveresation = (e: MouseEvent) => {
		e.stopPropagation();
		const response = window.prompt("대화의 새 이름을 입력해주세요.");

		if (response) {
			dispatch(
				renameConversation({
					id: c.dmConversation.conversationId,
					name: response,
				}),
			);
		}
	};

	const onDeleteConversation = (e: MouseEvent) => {
		e.stopPropagation();
		const response = window.confirm("정말 이 대화를 숨김 처리하시겠어요?");

		if (response) {
			dispatch(
				deleteConversation({
					name,
					id: c.dmConversation.conversationId,
				}),
			);
		}
	};

	return (
		<>
			{!conversation_STORE?.deleted && (
				<div
					className={`
                        flex justify-between align-center 
                        min-w-84
                        w-full p-4
                        border-x-4 border-y-2
                        cursor-pointer
                        ${isCurConversation ? "bg-sky-800" : ""}
                    `}
					onClick={onSelectConversation}
					onKeyUp={onSelectConversation}
				>
					<span className="flex flex-col justify-center">
						{name.slice(0, 31)}
					</span>

					<div className="flex space-x-4">
						<button
							type="button"
							className={buttonClass}
							onClick={onRenameConveresation}
						>
							<Edit />
						</button>
						<button
							type="button"
							className={`${buttonClass} fill-red-800`}
							onClick={onDeleteConversation}
						>
							<Bin />
						</button>
						<div className="flex flex-col justify-center w-fit rounded-xl text-sm bg-gray-800 p-2">
							{c.dmConversation.messages.length}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
