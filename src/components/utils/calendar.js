import moment from "jalali-moment";

function getLastDayOfMonthPersianDate(firstDayOfNextMonthSt){
    const firstDayOfNextMonth = moment.from(firstDayOfNextMonthSt, 'fa', 'YYYY/MM/DD');
    const lastDayOfMonth = firstDayOfNextMonth.add(-1,'d');
    return lastDayOfMonth.locale('fa').format('YYYY/M/D');
}

export function getCurrentMonth() {
    const jalaliDate = moment(); // Get the current Jalali date
    const year = jalaliDate.jYear(); // Get the Jalali year
    const month = jalaliDate.jMonth(); // Get the Jalali month

    // Calculate the first day of the current month in Jalali calendar
    const firstDayJalali = moment([year, month, 1]);

    // Calculate the last day of the current month in Jalali calendar
    const lastDayJalali = getLastDayOfMonthPersianDate(firstDayJalali);

    // Convert the first and last day of the month to Gregorian calendar
    const firstDayGregorian = moment(firstDayJalali).locale('en').format('YYYY-MM-DD');
    const lastDayGregorian = moment(lastDayJalali).locale('en').format('YYYY-MM-DD');

    return {
        firstDayJalali,
        lastDayJalali,
        firstDayGregorian,
        lastDayGregorian
    };
}