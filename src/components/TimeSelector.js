import timeTable from "../assets/data/timetable.json";
import "./TimeSelector.scss";

const TimeSelector = ({ setTime, indexSelected }) => {
  return (
    <div className="time-list">
      {timeTable.map((value, index) => {
        return (
          <span
            className={index === indexSelected ? "selected" : ""}
            onClick={() => setTime({ value, index })}
            key={index}
          >
            {value}
          </span>
        );
      })}
    </div>
  );
};

export default TimeSelector;
