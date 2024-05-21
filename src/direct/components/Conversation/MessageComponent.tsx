import type { Message } from "../../types";
import { decode } from "html-entities";

type MessageProps = {
	message: Message;
	curUserId: string;
};

// 10만개 가량의 DOM요소를 만들 경우 테일윈드로 인한 오버헤드가 심각하므로 일반 css로 대체
export default function MessageComponent(props: MessageProps) {
	const { message, curUserId } = props;
	const isSentByCurUser = message.messageCreate.senderId === curUserId;
	const commonClassName =
		"max-w-[320px] text-left whitespace-pre-wrap rounded-xl p-4";
	const className = isSentByCurUser
		? `${commonClassName} bg-[#224488] justify-self-end`
		: `${commonClassName} bg-[#333] justify-self-start`;

	return (
		<div className="grid">
			<div className={className} title={message.messageCreate.createdAt}>
				{decode(message.messageCreate.text)}
			</div>
		</div>
	);
}
