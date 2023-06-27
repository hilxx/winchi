/** YYYY-MM-DD HH:mm:ss */
export const dateFormatYYYYMMDD_HHmmss = (date_: Date | number) => {
	const to2String = (v: number) => v.toString().padStart(2, '0')
	const date = new Date(date_)
	const YYYY = date.getFullYear()
	const MM = to2String(date.getMonth() + 1)
	const DD = to2String(date.getDate())

	const hh = to2String(date.getHours())
	const mm = to2String(date.getMinutes())
	const ss = to2String(date.getSeconds())

	return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}

/** YYYY-MM-DD */
export const dateFormatYYYYMMDD = (date_: Date | number | string = Date.now()) => {
	const date = new Date(date_)
	const to2String = (v: number) => v.toString().padStart(2, '0')
	const YYYY = date.getFullYear()
	const MM = to2String(date.getMonth() + 1)
	const DD = to2String(date.getDate())

	return `${YYYY}-${MM}-${DD}`
}
