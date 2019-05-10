import { get } from './axios';


const baseUrl = 'https://bus.im-neko.net'

export const getTimeTable = async () => {
  return await get(baseUrl + "/static/timeTable.json");
} 

export const getHolidays = async () => {
  return await get(baseUrl + "/static/holidays.json");
}
