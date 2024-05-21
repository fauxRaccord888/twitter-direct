export function isValidMouseEvent(e: unknown) {
	return (
		e !== null && typeof e === "object" && "type" in e && e.type === "click"
	);
}
