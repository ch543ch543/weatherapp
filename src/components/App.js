import React from "react";
import "./App.css";
import axios from "../apis/api";
import WeatherBody from "./WeatherBody/WeatherBody";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dailytemp:[],
            currenttemp: [],
            city: 'search for a city',
            isLoaded : false
        }
    }

    componentDidMount(){
        this.setState({isLoaded: true})
    }

    // componentDidUpdate(){
    //     WeatherBody.length('hourly?city=${this.state.city}&key=')
    // }

    searchCity = async cityy => {
        
        let daily = await axios
        .get(`forecast/daily?city=${cityy}&key=4acd0858dcb94ec5a1dac6f0816b7148`)

        let current = await axios
        .get(`current?city=${cityy}&key=4acd0858dcb94ec5a1dac6f0816b7148`)

            const dailytemp = daily.data.data;
            const city = daily.data.city_name;
            const currenttemp = current.data.data;
            console.log(currenttemp);
            
            this.setState({
                dailytemp: dailytemp,
                currenttemp: currenttemp,
                city: city
             });
             console.log(this.state.dailytemp);
    }

    render() {
        //methods

        const date = this.state.dailytemp.map(el => {
            return el.valid_date.substr(5,5)
        });

        const minTemp = this.state.dailytemp.map(el => {
            return parseInt(el.low_temp)
        })

        const maxTemp = this.state.dailytemp.map(el => {
            return parseInt(el.max_temp)
        })

        const icon = this.state.dailytemp.map(el => {
            return el.weather.code
        })

        const description = this.state.currenttemp.map(el => {
            return el.weather.description
        })

        const currentweather = this.state.currenttemp.map(el => {
            return `${parseInt(el.app_temp)}°C`
        })

        

        //loader
        if(!this.state.isLoaded){
            return <Loader msg={'loading...'} />
        }
        return (
            <div className = "App">
                <React.Fragment>
                    <SearchBar searchCity={this.searchCity} city={this.state.city}/>  
                    {/* searchCity及city是SearchBar.js的props */}
                </React.Fragment>
                <div className = "weatherContainer py-3">
                    <div className='current'>
                        <h6 className="cityName"> {'NOW'} </h6>
                        <h5 className="cityName"> {this.state.city} </h5>
                        <p className='currentweather font-size: large'> {currentweather[0]} </p>
                        <h6 className='descrip'> {description[0]} </h6>
                    </div>
                    <div className='daily'>
                        <WeatherBody date={date[0]} icon={icon[0]} minTemp={minTemp[0]} maxTemp={maxTemp[0]} />
                        <WeatherBody date={date[1]} icon={icon[1]} minTemp={minTemp[1]} maxTemp={maxTemp[1]} />
                        <WeatherBody date={date[2]} icon={icon[2]} minTemp={minTemp[2]} maxTemp={maxTemp[2]} />
                        <WeatherBody date={date[3]} icon={icon[3]} minTemp={minTemp[3]} maxTemp={maxTemp[3]} />
                        <WeatherBody date={date[4]} icon={icon[4]} minTemp={minTemp[4]} maxTemp={maxTemp[4]} />
                    </div>
                </div>
            </div>
        )
    };
};


export default App;