import React from "react";
import { useContext } from "react";
import {
  kelvinToCelsius,
  kelvintToFarenheit,
} from "../../utils/weatherConversion";
import { CoordsContext } from "../../context/CoordsContext.js";
import { ThemeContext } from "../../context/ThemeContext";
import { UIContext } from "../../context/UIContext";
import "../../styles/TempCurrent.scss";

const TempCurrent = () => {
  const { weatherData, selectedDay } = useContext(CoordsContext);
  const { isDark } = useContext(ThemeContext);
  const { farenheit } = useContext(UIContext);

  return (
    <div className="tempCurrent">
      <p className={`tempValue ${isDark ? "dark" : "light"}-pri-text`}>
        {farenheit
          ? kelvintToFarenheit(weatherData[selectedDay]?.main.temp)
          : kelvinToCelsius(weatherData[selectedDay]?.main.temp)}
      </p>
      <p className={`tempUnity ${isDark ? "dark" : "light"}-sec-text`}>
        {farenheit ? "°F" : "°C"}
      </p>
    </div>
  );
};

export default TempCurrent;
