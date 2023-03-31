import {convertUnit, getIcon} from "../helpers";

const Card = ({day, index, unit}) => {
  const date = day.date.toString();
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const dayOfMonth = date.slice(6, 8);
  const formattedDate = new Date(year, month - 1, dayOfMonth)
    .toDateString()
    .slice(0, 3);

  const unitShorthand =
    unit === "kelvin"
      ? unit.slice(0, 1).toUpperCase() + " "
      : "°" + unit.slice(0, 1).toUpperCase() + " ";

  return (
    <div className='card-container'>
      <h3> {index === 0 ? "Today" : formattedDate} </h3>{" "}
      <div className='daily-icon'> {day.weather && getIcon(day.weather)} </div>{" "}
      <p> {day.weather} </p> <hr />
      <div className='temp'>
        <p> {convertUnit(unit, day.temp2m.max)} </p>{" "}
        <p>
          {" "}
          {unitShorthand}
          max{" "}
        </p>{" "}
      </div>{" "}
      <div className='temp'>
        <p> {convertUnit(unit, day.temp2m.min)} </p>{" "}
        <p>
          {" "}
          {unitShorthand}
          min{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

export default Card;
