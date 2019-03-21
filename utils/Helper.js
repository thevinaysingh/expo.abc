
export const getFormatTime = (stringTime) => {
    if(stringTime === "" || stringTime === null) {
        return "--";
    }

    let date = new Date(stringTime);
    let hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    return `${hour}:${minute} ${date.getHours() >=12 ? "PM" : "AM"}`;
}