type ValidKeys = "Enter";

export function isValidKeyupEvent(e: unknown, key: ValidKeys) {
	return (
		e !== null &&
		typeof e === "object" &&
		"type" in e &&
		e.type === "keyUp" &&
		"key" in e &&
		e.key === key
	);
}
