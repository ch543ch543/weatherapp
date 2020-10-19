import React from 'react';
import './WeatherBody.css';
import Days from '../Days/Days'
import Icon from '../Iconn/Icon'
import Temp from '../Temp/Temp'
import Date from '../Date/Date'

const WeatherBody = (props) => {
    return (
        <div className = "WeatherBody card">
            <Date date={props.date} />
            <Days day={props.day} />
            <Icon icon={props.icon} />
            <Temp minTemp={props.minTemp} maxTemp={props.maxTemp} />
        </div>
    )
}

export default WeatherBody;
