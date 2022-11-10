import React from 'react'

export default function Weather({capital, temp, weatherIcon, wind}) {
    const URL_W_ICON=`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  return (
    <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {temp} Celcius</p>
        <img src={URL_W_ICON} alt="weather Icon" />
        <p>wind {wind} m/s</p>
    </div>
  )
}
