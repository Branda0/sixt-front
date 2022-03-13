import { useState } from "react";
import DateRangePicker from "react-daterange-picker";
// import "react-daterange-picker/dist/css/react-calendar.css";
import "react-daterange-picker/src/css/react-calendar.scss";

import Arrow from "./Arrow";

const DateRange = ({ setDateStart, setDateEnd }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [dates, setDates] = useState(null);

  const onSelect = (dates) => {
    // setValue(value);
    setDates(dates);
    setDateStart(dates.start.format("MMMM"));
    setDateEnd(dates.end.format("LLLL"));
  };

  return (
    <div>
      <div>
        <input type="button" value="Toggle date picker" onClick={() => setIsOpen(!isOpen)} />
      </div>

      {isOpen && (
        <DateRangePicker
          value={dates}
          onSelect={onSelect}
          minimumDate={Date.now()}
          locale={"FR"}
          singleDateRange={true}
          //   paginationArrowComponent={<Arrow />}
        />
      )}
    </div>
  );
};

export default DateRange;
