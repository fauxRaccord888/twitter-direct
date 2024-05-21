import type { DMConversation } from "../types";
import { useEffect, useState } from "react";
import { assertIsValidDm } from "../validator";
import { sortDirectMessage } from "../function";

export function useSortedDirect(file: File | null) {
	const [direct, setSortedDirect] = useState<DMConversation[] | null>(null);

	useEffect(() => {
		if (!file) return;
		const response = file?.text();
		response?.then((res) => {
			const stringified = res.slice(35);
			const parsed = JSON.parse(stringified);
			assertIsValidDm(parsed);

			const sorted = sortDirectMessage(parsed);

			setSortedDirect(sorted);
		});
	}, [file]);

	return direct;
}
