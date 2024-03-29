import React, { useContext } from "react";
import { TiLocationArrow } from "react-icons/ti";
import styled from "styled-components";
import "../../styles/HighlightsBox.scss";
import useWindPos from "../../hooks/useWindPos";
import { ThemeContext } from "../../context/ThemeContext";
import { CoordsContext } from "../../context/CoordsContext";
import { BeatLoader } from "react-spinners";

const HighlightBox = ({ type, title, value, unit, windP }) => {
  const { windDirection, angleRotation } = useWindPos(windP);
  const { isDark } = useContext(ThemeContext);
  const { loadingWeatherData } = useContext(CoordsContext);

  return (
    <div
      className={`boxContainer ${isDark ? "dark" : "light"}-bg-box ${
        isDark ? "dark" : "light"
      }-pri-text `}
    >
      {!loadingWeatherData ? (
        <>
          <h4>{title}</h4>
          <div className="valueContainer">
            <p className="value">{value}</p>
            <p className="unit">{unit}</p>
          </div>
          {type === "wind" && (
            <WindDirection
              isDark={isDark}
              angle={angleRotation}
              windP={windDirection}
            />
          )}
          {type === "humidity" && <HumidityMeter value={value} />}
        </>
      ) : (
        <div className="loaderContainer">
          <BeatLoader color="white" />
        </div>
      )}
    </div>
  );
};

const WindDirection = ({ windP, angle, isDark }) => {
  return (
    <div className="windDirection">
      <LocationArrowContainer
        className={`searchButton ${isDark ? "dark" : "light"}-bg-button ${
          isDark ? "dark" : "light"
        }-pri-text`}
        angle={angle}
      >
        <TiLocationArrow />
      </LocationArrowContainer>
      <p>{windP}</p>
    </div>
  );
};

const MeasureHumidity = styled.div`
  background-color: #ffec65;
  border-radius: 4px;
  width: ${(props) => props.value + "%"};
`;

const HumidityMeter = ({ value }) => (
  <div className="humidityMeter">
    <div className="percentajeValue">
      <p>0</p>
      <p>50</p>
      <p>100</p>
    </div>
    <div className="meterBack">
      <MeasureHumidity value={value} />
    </div>
    <div className="percentaje">
      <p>%</p>
    </div>
  </div>
);

const LocationArrowContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  padding: 2px;
  transform: rotate(${(props) => props.angle});
`;

export default React.memo(HighlightBox);
