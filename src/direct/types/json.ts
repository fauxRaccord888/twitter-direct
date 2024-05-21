export type DMConversation = {
	dmConversation: {
		conversationId: string;
		messages: Message[];
	};
};

export type Message = {
	messageCreate: {
		recipientId: string;
		text: string;
		senderId: string;
		id: string;
		createdAt: string;
		// 처리하지 않음
		reactions: never[];
		urls: never[];
		mediaUrls: never[];
	};
};
