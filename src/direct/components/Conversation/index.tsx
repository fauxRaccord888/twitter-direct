import type { DMConversation } from "../../types";
import type { getCurUser } from "../../function";
import { useMemo, useState } from "react";
import MessageComponent from "../Conversation/MessageComponent";
import ConversationComponent from "../Conversation/ConversationComponent";
import Button from "../common/Button";

type ConversationProps = {
	conversations: DMConversation[] | null;
	curUser: ReturnType<typeof getCurUser>;
};

export default function Conversation(props: ConversationProps) {
	const { conversations, curUser } = props;
	const [selectedConversation, setSelectedConversation] =
		useState<DMConversation | null>(null);
	const [curPage, setCurPage] = useState(0);

	const MESSAGE_PER_PAGE = 10000;
	const msgLength = selectedConversation?.dmConversation.messages.length;
	const hasPrevPage = msgLength && curPage !== 0;
	const hasNextPage = msgLength && (curPage + 1) * MESSAGE_PER_PAGE < msgLength;

	const conversationComponent = useMemo(() => {
		const onSelectConversation = (c: DMConversation) => {
			setSelectedConversation(c);
			setCurPage(0);
		};

		return (
			<div className="flex flex-col w-1/2 custom-scroll p-4">
				{conversations?.map((c) => (
					<ConversationComponent
						key={c.dmConversation.conversationId}
						c={c}
						isCurConversation={
							c.dmConversation.conversationId ===
							selectedConversation?.dmConversation.conversationId
						}
						setSelectedConversation={() => onSelectConversation(c)}
					/>
				))}
			</div>
		);
	}, [conversations, selectedConversation?.dmConversation.conversationId]);

	const messagesComponent = useMemo(() => {
		const onMovePrevPage = () => setCurPage(curPage - 1);
		const onMoveNextPage = () => setCurPage(curPage + 1);

		return (
			<div className="flex flex-col max-h-fit w-1/2 custom-scroll p-4 space-y-4">
				{selectedConversation && hasPrevPage && (
					<Button
						className="h-16 bg-slate-800 rounded-3xl"
						onClick={onMovePrevPage}
					>
						이전 페이지 불러오기
					</Button>
				)}
				{selectedConversation &&
					curUser &&
					selectedConversation.dmConversation.messages
						.slice(curPage * MESSAGE_PER_PAGE, (curPage + 1) * MESSAGE_PER_PAGE)
						.map((m) => (
							<MessageComponent
								key={m.messageCreate.id}
								message={m}
								curUserId={curUser}
							/>
						))}
				{selectedConversation && hasNextPage && (
					<Button
						className="h-16 bg-slate-800 rounded-3xl"
						onClick={onMoveNextPage}
					>
						다음 페이지 불러오기
					</Button>
				)}
			</div>
		);
	}, [curPage, curUser, hasNextPage, hasPrevPage, selectedConversation]);

	return (
		<>
			{conversations && (
				<div className="flex w-[66vw] min-w-[800px] h-[80vh] overscroll-none p-4 m-0 border-4 border-white">
					{conversationComponent}
					{messagesComponent}
				</div>
			)}
		</>
	);
}
