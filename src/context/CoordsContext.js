import React, { createContext, useState, useEffect } from "react";
import useWeatherData from "../hooks/useWeatherData";
import useCityCoords from "../hooks/useCityCoords";
import { useGeoLocation } from "use-geo-location";
import useReverseGeocoding from "../hooks/useReverseGeocoding";

const CoordsContext = createContext();

const CoordsContextProvider = ({ children }) => {
  const [geoActive, setGeoActive] = useState(true);
  const { latitude, longitude } = useGeoLocation();
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [inputData, setInputData] = useState("");
  const [submitData, setSubmitData] = useState(null);
  const { reversedData, errorReversedData, loadingReversedData } =
    useReverseGeocoding(coords.lat, coords.lon);
  const {
    weatherData,
    errorWeatherData,
    loadingWeatherData,
    selectedDay,
    handleSelectedDay,
  } = useWeatherData(coords.lat, coords.lon);

  const { cityCoords, loadingCoords, errorCoords, hasError } =
    useCityCoords(submitData);

  useEffect(
    () =>
      geoActive
        ? setCoords({ lat: latitude, lon: longitude })
        : setCoords({ lat: coords.lat, lon: coords.lon }),
    [latitude, longitude, geoActive, coords.lat, coords.lon]
  );

  function handleGeoActive() {
    setGeoActive((prev) => !prev);
  }

  function handleCoords(lat, lon) {
    handleGeoActive();
    setCoords({ lat: lat, lon: lon });
  }

  function handleInputData(e) {
    setInputData(e.target.value);
  }
  function handleSubmitData(e) {
    e.preventDefault();
    setSubmitData(inputData);
  }

  function resetSearch() {
    setInputData("");
  }

  const variables = {
    weatherData,
    errorWeatherData,
    loadingWeatherData,
    handleCoords,
    inputData,
    submitData,
    cityCoords,
    loadingCoords,
    hasError,
    errorCoords,
    handleInputData,
    handleSubmitData,
    selectedDay,
    handleSelectedDay,
    reversedData,
    handleGeoActive,
    resetSearch,
    errorReversedData,
    loadingReversedData,
  };

  return (
    <CoordsContext.Provider value={variables}>
      {children}
    </CoordsContext.Provider>
  );
};

export { CoordsContext, CoordsContextProvider };
