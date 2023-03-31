const UnitContainer = ({handleClick, unit}) => {
  return (
    <div className='unit-container'>
      <button
        id='celcius'
        onClick={handleClick}
        className={unit === "celcius" ? null : "greyed"}
      >
        °C{" "}
      </button>{" "}
      <button
        id='fahrenheit'
        onClick={handleClick}
        className={unit === "fahrenheit" ? null : "greyed"}
      >
        °F{" "}
      </button>{" "}
      <button
        id='kelvin'
        onClick={handleClick}
        className={unit === "kelvin" ? null : "greyed"}
      >
        K{" "}
      </button>{" "}
    </div>
  );
};

export default UnitContainer;
