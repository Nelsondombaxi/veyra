import React from "react";
import "./DateWidget.css";
import { HiOutlineCalendar } from "react-icons/hi2";

const DateWidget = () => {
  const date = new Date();
  
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });
  const day = date.toLocaleDateString("pt-BR", { day: "2-digit" });
  const month = date
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");

  return (
    <div className="date-widget-container">
      <div className="date-icon-box">
        <HiOutlineCalendar />
      </div>
      <div className="date-text-content">
        <span className="date-weekday">{weekday}</span>
        <span className="date-full">{day} {month}</span>
      </div>
    </div>
  );
};

export default DateWidget;