import { useState, useEffect, createContext } from "react";
import timeTable from "../assets/data/timetable.json";
import moment from "moment";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  // Stored engine states
  const storedSearch = localStorage.getItem("storedSearch");
  const storedAgency = localStorage.getItem("storedAgency");
  const storedTimeStart = JSON.parse(localStorage.getItem("storedTimeStart"));
  const storedTimeEnd = JSON.parse(localStorage.getItem("storedTimeEnd"));
  const storedDateStart = localStorage.getItem("storedDateStart");
  const storedDateEnd = localStorage.getItem("storedDateEnd");

  //Search engine states
  const [search, setSearch] = useState(storedSearch || "");
  const [agency, setAgency] = useState(storedAgency || null);
  const [timeStart, setTimeStart] = useState(storedTimeStart || { value: timeTable[2], index: 2 });
  const [timeEnd, setTimeEnd] = useState(storedTimeEnd || { value: timeTable[16], index: 16 });
  const [dateStart, setDateStart] = useState(storedDateStart || moment(Date.now()).format("YYYY-MM-DD"));
  const [dateEnd, setDateEnd] = useState(moment(storedDateEnd || Date.now()).format("YYYY-MM-DD"));

  //Calculate total days of renting => Math.ceil as "1.2" days is billed as 2 full days"
  const rentalDays = Math.ceil(
    (new Date(`${dateEnd}T${timeEnd.value}:00`) - new Date(`${dateStart}T${timeStart.value}:00`)) /
      (1000 * 3600 * 24)
  );

  // States local storage saving Hook (search state saved on agency list selection)
  useEffect(() => {
    localStorage.setItem("storedAgency", String(agency));
    localStorage.setItem("storedTimeStart", JSON.stringify(timeStart));
    localStorage.setItem("storedTimeEnd", JSON.stringify(timeEnd));
    localStorage.setItem("storedDateStart", String(dateStart));
    localStorage.setItem("storedDateEnd", String(dateEnd));
  }, [agency, timeStart, timeEnd, dateStart, dateEnd]);

  return (
    <SearchContext.Provider
      value={{
        search: [search, setSearch],
        agency: [agency, setAgency],
        timeStart: [timeStart, setTimeStart],
        timeEnd: [timeEnd, setTimeEnd],
        dateStart: [dateStart, setDateStart],
        dateEnd: [dateEnd, setDateEnd],
        rentalDays: rentalDays,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};
