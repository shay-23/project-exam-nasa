const WeatherApi = `https://api.nasa.gov/insight_weather/?api_key=OHEbI7rTkhvwIuzGPAUuwvezPdwKXaxcbU0CDoSI&feedtype=json&ver=1.0`;



const currentSolElement = document.querySelector(`[data-number]`)
const curTempHigh = document.querySelector(`[data-temp-high]`)
const curTempLow = document.querySelector(`[data-temp-low]`)
const curSolDate = document.querySelector(`[sol-date]`)

let selectedSolIndex

getWeatherApi().then(sols => {
    selectedSolIndex = sols.length - 1
    displaySelectedSol(sols)
});

function displaySelectedSol(sols) {
    const selectedSol = sols[selectedSolIndex]
    currentSolElement.innerHTML = selectedSol.sol
    curTempHigh.innerHTML = selectedSol.maxTemp
    curTempLow.innerHTML = selectedSol.minTemp
}


function getWeatherApi() {
    return fetch(WeatherApi).then(res => res.json())
        .then(data => {
            const {
                sol_keys,
                validity_checks,
                ...solData
            } = data
            return Object.entries(solData).map(([sol, data]) => {
                return {
                    sol: sol,
                    maxTemp: data.AT.mx,
                    minTemp: data.AT.mn,
                    date: new Date(data.First_UTC)
                }
            })
        })
        .catch(function(error) {
            console.log(error + "Something is wrong");

        })
}