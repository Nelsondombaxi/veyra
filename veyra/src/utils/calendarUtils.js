// src/utils/calendarUtils.js
import { holidays } from '../data/holidays';

export const getHoliday = (day, month, year) => {
  // Formata o dia e mês para ter 2 dígitos (ex: 4 vira "04")
  const formattedDay = String(day).padStart(2, '0');
  const formattedMonth = String(month + 1).padStart(2, '0'); // Mês começa do 0 em JS
  
  const key = `${formattedMonth}-${formattedDay}`;

  // Retorna o objeto do feriado se existir, ou null
  return holidays[key] || null;
};