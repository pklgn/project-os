export function generateUUID(): string {
	const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
	const rawUUID = template.map((symbol) => {
		const value = Math.random() * 16
		if (symbol !== 'x' && symbol !== 'y') {
			return symbol
		}
		const currHalfByte = symbol === 'x'
			? Math.floor(value)
			: value & 0x3 | 0x8

		return currHalfByte.toString(16)
	})

	return rawUUID.join('').toString()
}