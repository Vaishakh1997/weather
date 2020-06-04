import React, { Component } from "react";
import axios from "axios";
import logo from "./weatherImage.jpg";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Data from "./Data";
class Home extends Component {
  state = {
    weatherData: "",
    cityName:''
  };



  changeCity = (event, value) => {
    axios.get(`http://api.weatherstack.com/current?access_key=37e8f0e5832ebd26e6184ecc7be14419&query=${value}`)
    .then(response=>{
        this.setState({weatherData:response.data})
    })
    .catch(error=>{
        console.log(error)
    })
  };

  render() {
      console.log(this.state.weatherData.request)
    return (
      <React.Fragment>
        <div className="main">
          {/* <Autocomplete
            onChange={(event, value) => this.changeCity(event, value)}
            id="combo-box-demo"
            options={Data}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select City" variant="outlined" />
            )}
          /> */}

          <Autocomplete
            onChange={(event, value) => this.changeCity(event, value)}
            id="free-solo-demo"
            freeSolo
            options={Data.map((option) => option.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search By City"
                margin="normal"
                variant="outlined"
              />
            )}
          />
         {this.state.weatherData === ""?<div></div>:
          <div className="display-res">
              <h2>{this.state.weatherData.request.query}</h2>
              <div className="image-dis">
                  <div className="image">
                      <img src={this.state.weatherData.current.weather_icons} style={{width:'100%', height:'100%'}}></img>
                      <h4>{this.state.weatherData.current.weather_descriptions}</h4>
                  </div>
                  <div className="main-dis">
                    <h3>{this.state.weatherData.current.temperature} &#8451;</h3>
                    <p><b>Feels like {this.state.weatherData.current.feelslike} &#8451;</b></p>
                  </div>
                  <div className="extra-dis">
                    <p><b>Wind: </b>{this.state.weatherData.current.wind_speed} kmph</p>
                    <p><b>Pressure: </b>{this.state.weatherData.current.pressure} mb</p>
                    <p><b>Precip: </b>{this.state.weatherData.current.precip} mm</p>
                  </div>
              </div>
          </div>}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
