function getFormattedDate(dateObject) {
    let day = dateObject.getDate().toString().padStart(2, "0");
    let month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    let year = dateObject.getFullYear();
    let hours = dateObject.getHours().toString().padStart(2, "0");
    let minutes = dateObject.getMinutes().toString().padStart(2, "0");
    let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()];

    return `${day}.${month}.${year} ${hours}:${minutes} ${weekDay}`;
}
