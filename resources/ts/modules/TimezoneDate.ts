import moment from "moment"

export function daysAgo(num) {
    const date = new Date();
    date.setDate(date.getDate() - num);
    return date;
}

export function getTimesBySmena(day, smena) {
    const current = moment(day);

    if (smena == 1) {
        const startDay = moment(current.format("YYYY-MM-DD 09:10")).unix();
        const endDay = moment(current.format("YYYY-MM-DD 21:10")).unix();
        return { start: startDay, end: endDay, smena: 1 };
    } else if (smena == 2) {
        const startDay = moment(current.format("YYYY-MM-DD 21:10")).unix();
        const endDay = moment(current.add(1, "day").format("YYYY-MM-DD 09:10")).unix();
        return { start: startDay, end: endDay, smena: 2 };
    }
}

export function detectSmenaDay(time) {
    const day = moment(time.format("YYYY-MM-DD 09:10"));
    const night = moment(time.format("YYYY-MM-DD 21:10"));

    if (day > time) {
        const date = time.add(-1, "day").format("YYYY-MM-DD");
        return { date, smena: 2 };
    } else if (day < time && time < night) {
        const date = time.format("YYYY-MM-DD");
        return { date, smena: 1 };
    }
    else if (night < time) {
        const date = time.format("YYYY-MM-DD");
        return { date, smena: 2 };
    }
}

export function formatDate(date, point = null) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (point == "start") return `${year}-${month}-${day} 09:00`;
    else if (point == "end") return `${year}-${month}-${day} 08:59`;
    else return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function splitDayNightShifts(data) {
    const arraysNightDay = chunkArray(data, 12);

    const arrayPeriods = [];
    arraysNightDay.forEach((element, index) => {
        if (index % 2 == 0) {
            const date = element[0].hour.split(" ")[0];
            arrayPeriods.push({
                date: date,
                day_speed: middleSpeed(element, 0),
                night_speed: middleSpeed(arraysNightDay[index + 1], 0),
            });
        }
    });

    return arrayPeriods;
}

export function middleSpeed(data, current) {
    return +(
        (data[current].average_speed +
            data[current + 1].average_speed +
            data[current + 2].average_speed +
            data[current + 3].average_speed +
            data[current + 4].average_speed +
            data[current + 5].average_speed +
            data[current + 6].average_speed +
            data[current + 7].average_speed +
            data[current + 8].average_speed +
            data[current + 9].average_speed +
            data[current + 10].average_speed +
            data[current + 11].average_speed) /
        12
    ).toFixed(3);
}

export function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}


export function secondsToFormatTime(seconds) {
    var houre, minute, second;
    houre = Math.floor(seconds / 3600);
    const remainderOfHour = Math.floor(seconds % 3600);
    minute = Math.floor(remainderOfHour / 60);
    second = Math.floor(remainderOfHour % 60);
 
    const hour = houre > 9 ? houre : `0${houre}`;
    const minut = minute > 9 ? minute : `0${minute}`;
    const secund = second > 9 ? second : `0${second}`;
    return `${hour}:${minut}:${secund}`;
 }

 export function getDateAndSmena(time = undefined) {
    const current = moment(time);
    const startToday = moment(moment().format(`YYYY-MM-DD 09:40`));
    const endToday = moment(moment().format(`YYYY-MM-DD 21:40`));
 
    if (startToday < current && endToday > current) {
       return { date: current.toDate(), smena: 1 };
    } else if (endToday < current) {
       return { date: current.toDate(), smena: 2 };
    } else {
       const currentClone = current.clone();
       return { date: currentClone.subtract(1, "day").toDate(), smena: 2 };
    }
 }