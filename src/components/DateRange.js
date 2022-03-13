import moment from "moment";
import { useState, useEffect } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
// import "react-daterange-picker/src/css/react-calendar.scss";

// import Arrow from "./Arrow";

const DateRange = ({ setDateStart, setDateEnd }) => {
  const [isOpen, setIsOpen] = useState(true);
  //   const today = new Date(2022, 2, 13);
  //   const today2 = new Date("2022-03-13T00:00:00");
  //   console.log(today);
  //   console.log(today2);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  //   const today = Date("2022-03-13");
  const dateTest2 = new Date(2022, 2, 17);
  const [dates, setDates] = useState(moment.range(moment(today), moment(today)));
  //   const [dates, setDates] = useState(null);
  //   const dateTest = new Date(2022, 3, 15);
  useEffect(() => {
    setDateStart(dates?.start?.format("YYYY-MM-DD"));
    setDateEnd(dates?.end?.format("YYYY-MM-DD"));
  }, [dates]);

  moment.locale("fr", {
    months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre"
      .toUpperCase()
      .split("_"),
    // monthsParseExact: true,
    weekdaysShort: "DI_LU_MA_ME_JE_VE_SA".split("_"),
    // weekdaysParseExact: true,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
  });

  const onSelect = (dates) => {
    // setValue(value);
    setDates(dates);
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
          className={"dateRange"}
          minimumDate={new Date()}
          //   initialDate={new Date()}
          //   initialFromValue={false}
          singleDateRange={true}
          firstOfWeek={1}
          locale={moment.locale("fr")}
          //   selectionType={"single"}
          // paginationArrowComponent={<span>YO</span>}
        />
      )}
    </div>
  );
};

export default DateRange;
