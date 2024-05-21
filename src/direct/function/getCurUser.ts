import type { DMConversation } from "../types";

export function getCurUser(conversations: DMConversation[] | null) {
	if (!conversations) return null;

	const visited = new Set<string>();
	for (const conversation of conversations) {
		const users = conversation.dmConversation.conversationId.split("-");
		for (const user of users) {
			if (visited.has(user)) return user;
			visited.add(user);
		}
	}

	return Array.from(visited.keys())[0];
}
