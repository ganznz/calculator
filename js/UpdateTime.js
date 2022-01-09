const timeDisplayText = document.querySelector("#time-text");
let dateHours = new Date().getHours();
let dateMins = new Date().getMinutes();
timeDisplayText.textContent = `${dateHours.toString()}:${dateMins.toString()}`;


const changeTime = () => {
    dateHours = new Date().getHours();
    dateMins = new Date().getMinutes();
    timeDisplayText.textContent = `${dateHours.toString()}:${dateMins.toString()}`;
}

setInterval(changeTime, 1000);