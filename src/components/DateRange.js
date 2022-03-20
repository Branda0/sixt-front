import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../context/SearchContext";

import moment from "moment";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import "./DateRange.scss";

// import "react-daterange-picker/src/css/react-calendar.scss";

// import Arrow from "./Arrow";

const DateRange = ({ setDateModal }) => {
  // Dates states values from context
  const [dateStart, setDateStart] = useContext(SearchContext).dateStart;
  const [dateEnd, setDateEnd] = useContext(SearchContext).dateEnd;

  // apply stored dates whenever we open calendar again
  const [dates, setDates] = useState(moment.range(dateStart, dateEnd));

  useEffect(() => {
    setDateStart(dates?.start?.format("YYYY-MM-DD"));
    setDateEnd(dates?.end?.format("YYYY-MM-DD"));
  }, [dates]);

  moment.locale("fr", {
    months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre"
      .toUpperCase()
      .split("_"),

    weekdaysShort: "DI_LU_MA_ME_JE_VE_SA".split("_"),
  });

  const onSelect = (dates) => {
    setDates(dates);
    setDateModal(false);
  };

  return (
    <DateRangePicker
      value={dates}
      onSelect={onSelect}
      className={"dateRange"}
      minimumDate={new Date()}
      singleDateRange={true}
      firstOfWeek={1}
      locale={moment.locale("fr")}
    />
  );
};

export default DateRange;
