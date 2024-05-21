import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppRootState } from "..";
import type { Conversation_Store } from "../../types";

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const conversationAdapter = createEntityAdapter({
	selectId: (node: Conversation_Store) => node.id,
});

type RenamePayload = {
	id: string;
	name: string;
};

const conversationSlice = createSlice({
	name: "conversation",
	initialState: {
		conversations: conversationAdapter.getInitialState(),
	},
	reducers: {
		renameConversation(state, action: PayloadAction<RenamePayload>) {
			const { id, name } = action.payload;
			conversationAdapter.upsertOne(state.conversations, {
				id,
				name,
				deleted: false,
			});
		},
		deleteConversation(state, action: PayloadAction<RenamePayload>) {
			const { id, name } = action.payload;
			conversationAdapter.upsertOne(state.conversations, {
				id,
				name,
				deleted: true,
			});
		},
		resetConversations(state) {
			conversationAdapter.removeAll(state.conversations);
		},
	},
});

export const { renameConversation, deleteConversation, resetConversations } =
	conversationSlice.actions;
export const conversationSelector =
	conversationAdapter.getSelectors<AppRootState>(
		(state) => state.conversation.conversations,
	);
export default conversationSlice.reducer;
