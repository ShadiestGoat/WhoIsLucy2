export type AnyInputEvent = MouseEvent | KeyboardEvent

export function shouldContinueEvent(e: AnyInputEvent, preventDefault = true): boolean {
	if ((e as KeyboardEvent).key) {
		if (['Enter', 'Space', ' '].includes((e as KeyboardEvent).key)) {
			if (preventDefault) e.preventDefault()

			return true
		}

		return false
	}

	if (preventDefault) e.preventDefault()

	return true
}
