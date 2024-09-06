

async function fetchNewCity(featchFor = "New York") {

    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${featchFor}/next5days?unitGroup=metric&key=X4CEPWEB9VZCCUU74PTKQR39B&include=days&elements=humidity,description,conditions,feelslike,temp,datetime&contentType=json`, { mode: 'cors' });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data

    }
    catch (error) {
        console.error(`Error fetching the weather for ${featchFor}:`, error);
    }
}




export { fetchNewCity }