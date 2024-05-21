import type { DMConversation, Message } from "../types";

export function assertIsValidDm(obj: unknown): asserts obj is DMConversation[] {
	if (!Array.isArray(obj)) throw new CustomError();
	for (const o of obj) {
		assertDMConversation(o);
	}
}

function assertDMConversation(obj: unknown): asserts obj is DMConversation {
	if (typeof obj !== "object" || obj === null) throw new CustomError();
	if (!("dmConversation" in obj)) throw new CustomError();

	const conversation = obj.dmConversation;
	if (typeof conversation !== "object" || conversation === null)
		throw new CustomError();
	if (!("conversationId" in conversation)) throw new CustomError();
	if (!("messages" in conversation)) throw new CustomError();

	if (!Array.isArray(conversation.messages)) throw new CustomError();
	for (const msg of conversation.messages) {
		assertMessage(msg);
	}
}

function assertMessage(obj: unknown): asserts obj is Message {
	if (typeof obj !== "object" || obj === null) throw new CustomError();
	if (!("messageCreate" in obj)) throw new CustomError();

	const message = obj.messageCreate;
	if (typeof message !== "object" || message === null) throw new CustomError();
	if (!("recipientId" in message)) throw new CustomError();
	if (!("text" in message)) throw new CustomError();
	if (!("senderId" in message)) throw new CustomError();
	if (!("id" in message)) throw new CustomError();
	if (!("createdAt" in message)) throw new CustomError();
}

// TODO 에러 심볼 정의
class CustomError extends Error {}
