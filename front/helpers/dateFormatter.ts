const makeDateObj = (date) => {
  const yearStr: string = date.getFullYear();
  const monthStr: string = (`00${date.getMonth() + 1}`).slice(-2);
  const dayStr: string = (`00${date.getDate()}`).slice(-2);
  const hourStr: string = (`00${date.getHours()}`).slice(-2);
  const minuteStr: string = (`00${date.getMinutes()}`).slice(-2);
  const secondStr: string = (`00${date.getSeconds()}`).slice(-2);
  const dateTimeStr: string = `${yearStr}-${monthStr}-${dayStr}T${hourStr}:${minuteStr}`;
  const dayOfWeek: number = date.getDay();
  const dayOfWeekStr: string =  [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];
  return {
    dateTimeStr,
    dayOfWeek,
    dayOfWeekStr,
    monthStr,
    dayStr,
    hourStr,
    minuteStr,
    secondStr,
    month: parseInt(monthStr, 10),
    day: parseInt(dayStr, 10),
    hour: parseInt(hourStr, 10),
    minute: parseInt(minuteStr, 10),
    second: parseInt(secondStr, 10),
  }
}

const dateObj = makeDateObj(new Date());
export type DateObjType = typeof dateObj; 

export default makeDateObj;
