import type { DMConversation, Message } from "../types";

export function sortDirectMessage(conversations: DMConversation[]) {
	// 동일 대화 통합
	const conversationMap: Record<string, DMConversation> = {};

	// TODO 불변 패턴 추가
	// WARNING 깊은 복제가 아니며 매개 변수로 받는 object를 변형함 - 편의를 위한 방법임
	for (const conversation of conversations) {
		const id = conversation.dmConversation.conversationId;
		if (id in conversationMap) {
			for (const message of conversation.dmConversation.messages) {
				conversationMap[id].dmConversation.messages.push(message);
			}
		} else {
			conversationMap[id] = conversation;
		}
	}

	// 정렬
	for (const key of Object.keys(conversationMap)) {
		conversationMap[key].dmConversation.messages.sort(
			(a, b) => getMs(a) - getMs(b),
		);
	}

	return Object.values(conversationMap);
}

function getMs(message: Message) {
	const t = new Date(message.messageCreate.createdAt).getTime();
	return t;
}
