import React from 'react'
import './Style/style.css'

class Forecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperature: "",
            wind: "",
            description: "",
            temperature1: "",
            wind1: "",
            temperature2: "",
            wind2: "",
            temperature3: "",
            wind3: "",
        };
    }

    getData = () => {
        let city = document.getElementById("cityName").value;
        const url = `https://goweather.herokuapp.com/weather/${city}`;

        try {
            fetch(url)
                .then((answer) => {
                    return answer.json()
                })
                .then((data) => {
                    if(data.temperature === "" || data.message === "NOT_FOUND") {
                        document.getElementById("infoContainer").style.display = 'none';
                        document.getElementById("errorMessage").style.display = 'block';
                    } else {
                        this.setState({
                            temperature: data.temperature,
                            wind: data.wind,
                            description: data.description,
                            temperature1: data.forecast[0].temperature,
                            wind1: data.forecast[0].wind,
                            temperature2: data.forecast[1].temperature,
                            wind2: data.forecast[1].wind,
                            temperature3: data.forecast[2].temperature,
                            wind3: data.forecast[2].wind
                        })

                        document.getElementById("infoContainer").style.display = 'block';
                        document.getElementById("errorMessage").style.display = 'none';
                    }
                })

        } catch(error) {
            document.getElementById("infoContainer").style.display = 'none';
            document.getElementById("errorMessage").style.display = 'block';
            console.log(error)
        }
    }

    render() {
        return (
            <div id="content">
                <div id="inputs">
                    <input type="text" id="cityName" placeholder='city name'/>
                    <button onClick={this.getData}>Get Weather</button>
                </div>
                <section id="errorMessage">Something went wrong!</section>
                <section id="infoContainer">
                    <h3>Today</h3>
                    <div class="info">Temperature:</div>{this.state.temperature}
                    <br />
                    <div class="info">Wind Speed:</div>{this.state.wind}
                    <br />
                    <div class="info">General Description:</div>{this.state.description}
                    <hr/>
                    <h3>Tomorrow</h3>
                    <div class="info">Temperature:</div>{this.state.temperature1}
                    <br />
                    <div class="info">Wind Speed:</div>{this.state.wind1}
                    <hr/>
                    <h3>The next day</h3>
                    <div class="info">Temperature:</div>{this.state.temperature2}
                    <br />
                    <div class="info">Wind Speed:</div>{this.state.wind2}
                    <hr/>
                    <h3>The next day</h3>
                    <div class="info">Temperature:</div>{this.state.temperature3}
                    <br />
                    <div class="info">Wind Speed:</div>{this.state.wind3}
                </section>
            </div>
        );
     }
}

export default Forecast
