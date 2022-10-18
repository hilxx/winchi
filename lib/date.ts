/** date的工厂函数 */
export const dateInstance = (v: any) => new Date(v);

/** YYYY-MM-DD HH:mm:ss */
export const dateFormatYYYYMMDD_HHmmss = (date: Date) => {
  const to2String = (v: number) => v.toString().padStart(2, '0');

  const YYYY = date.getFullYear();
  const MM = to2String(date.getMonth() + 1);
  const DD = to2String(date.getDate());

  const hh = to2String(date.getHours());
  const mm = to2String(date.getMinutes());
  const ss = to2String(date.getSeconds());

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};
