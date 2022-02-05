const timeDisplayText = document.querySelector("#time-text");
let dateHours = new Date().getHours();
let dateMins = new Date().getMinutes();
timeDisplayText.textContent = `${dateHours.toString()}:${dateMins.toString()}`;


const changeTime = () => {
    dateHours = new Date().getHours() ;
    dateMins = new Date().getMinutes();

    minsDisplay = dateMins < 10 ? `0${dateMins.toString()}`
    : `${dateMins.toString()}`;
    
    hoursDisplay = dateHours < 10 ? `0${dateHours.toString()}`
    : `${dateHours.toString()}`

    timeDisplayText.textContent = `${hoursDisplay}:${minsDisplay}`
}

setInterval(changeTime, 1000);