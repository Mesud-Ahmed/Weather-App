import { fetchNewCity } from "./fetchWeather";
import sunnyImage from './images/sunny.jpg';
import snowImage from './images/snow.jpg';
import rainImage from './images/rain.jpg';
import cloudyImage from './images/cloudy.jpg';
import defaultImage from './images/default.jpg';


let data = await fetchNewCity("New York")

const content = document.querySelector(".info")
const addressInfo = document.createElement("h2")
addressInfo.innerText = "Address Information:"
content.appendChild(addressInfo)

const today = document.querySelector(".today")
const todayHeader = document.createElement("h2")
todayHeader.innerText = "Today Weather:"
today.appendChild(todayHeader)

const next5 = document.querySelector(".next5")
const input = document.querySelector("#search")
const btn = document.querySelector("#look")



btn.addEventListener("click", async () => {
    if (input.value.trim() !== '') {
        next5.innerText = ""
        today.innerText = ""
        today.appendChild(todayHeader)
        content.innerText = ""
        content.appendChild(addressInfo)
        data = await fetchNewCity(input.value);
        manipulateDom()
    }
})
let todayWeather,unit = " °C" ,condition ,days

function manipulateDom() {
    condition = data.days[0].conditions; // Move this inside the function
    todayWeather = data.days[0];
    days = data.days;

    for (let key in data) {
        if (key != "queryCost" && key != "tzoffset" && key != "days") {

            const para = document.createElement("p")
            para.innerText = `${key}: ${data[key]} `
            content.append(para)
        }

    }

    for (let key in todayWeather) {
        if (key === "temp" || key === "feelslike") {
            const para = document.createElement("p");
            para.innerText = `${key}: ${todayWeather[key]} ${unit}`;
            today.append(para);
        } else {
            const para = document.createElement("p");
            para.innerText = `${key}: ${todayWeather[key]}`;
            today.append(para);
            console.log(todayWeather[key])
        }


    }

    for (let i = 1; i < days.length; i++) {
        const div = document.createElement("div")
        for (let key in days[i]) {

            if (key === "temp" || key === "feelslike") {
                const para = document.createElement("p");
                para.innerText = `${key}: ${days[i][key]} ${unit}`;
                div.append(para);
            } else {
                const para = document.createElement("p");
                para.innerText = `${key}: ${days[i][key]}`;
                div.append(para);
            }
            

        }
        next5.appendChild(div)
    }
    setWeatherCondition()
}


function setWeatherCondition() {
    if (/sunny|clear/i.test(condition)) {
        document.body.style.backgroundImage = `url(${sunnyImage})`;

    } else if (/cloudy|partially cloudy/i.test(condition)) {
        document.body.style.backgroundImage = `url(${cloudyImage})`;
    }
    else if (/rain/i.test(condition)) {
        document.body.style.backgroundImage = `url(${rainImage})`;
    }
    else if (/snow/i.test(condition)) {
        document.body.style.backgroundImage = `url(${snowImage})`;
    } else {
        document.body.style.backgroundImage = `url(${defaultImage})`;
    }
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
 
    document.body.style.backgroundRepeat = "no-repeat";

}


export { manipulateDom, setWeatherCondition }