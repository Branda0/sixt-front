import { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";

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

      {isOpen && <DateRangePicker value={dates} onSelect={onSelect} locale={"fr"} singleDateRange={true} />}
    </div>
  );
};

export default DateRange;
