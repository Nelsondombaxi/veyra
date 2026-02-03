import { holidays } from '../data/holidays';

export const getHoliday = (day, month) => {
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month + 1).padStart(2, '0'); 
  
  const key = `${formattedMonth}-${formattedDay}`;

  return holidays[key] || null;
};