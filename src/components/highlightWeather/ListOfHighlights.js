import "../../styles/ListOfHighlights.scss";
import React from "react";
import { useContext } from "react";
import { CoordsContext } from "../../context/CoordsContext.js";
import { metersToMiles, msToMph } from "../../utils/weatherConversion.js";
import { BeatLoader } from "react-spinners";
import HighlightBox from "./HighlightBox";

const ListOfHighlights = () => {
  const { weatherData, loadingWeatherData, selectedDay } =
    useContext(CoordsContext);

  return (
    <div className="listOfHighlights">
      <HighlightBox
        type="wind"
        value={msToMph(weatherData[selectedDay]?.wind.speed)}
        unit="mph"
        windP={weatherData[selectedDay]?.wind.deg} //Aca le paso la posicion del viento
        title="Wind status"
      />
      <HighlightBox
        type="humidity"
        value={weatherData[selectedDay]?.main.humidity}
        unit="%"
        title="Humidity"
      />
      <HighlightBox
        type="visibility"
        value={metersToMiles(weatherData[selectedDay]?.visibility)}
        unit="miles"
        title="Visibility"
      />
      <HighlightBox
        type="pressure"
        value={weatherData[selectedDay]?.main.pressure}
        unit="mb"
        title="Air Pressure"
      />
      {/* <Suspense fallback={}></Suspense> */}
    </div>
  );
};

export default ListOfHighlights;
