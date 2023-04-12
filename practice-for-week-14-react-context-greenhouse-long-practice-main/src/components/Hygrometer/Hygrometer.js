import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useClimate } from "../../context/ClimateContext";
import {useState, useEffect} from "react"

function Hygrometer() {
  const { humidity, setHumidity } = useClimate();
  const [actualHumidity, setActualHumidity] = useState(humidity);

  useEffect(() => {
    if (actualHumidity < humidity) {
      let plus = setTimeout(() => {
        setActualHumidity(actualHumidity + 1)
      }, 500);
    } else if (actualHumidity > humidity) {
      let minus = setTimeout(() => {
        setActualHumidity(actualHumidity - 1)
      }, 500);
    }
    // console.log(actualHumidity)
  }, [humidity, actualHumidity])

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {actualHumidity}%</div>
      <ReactSlider
        value={humidity}
        onAfterChange={(val) => {setHumidity(val)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Hygrometer;