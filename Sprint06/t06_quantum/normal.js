const FYEAR = '1939';
const FMONTH = '01';
const FDAY = '01';
// F stays for Fell

const DAYMS = 24 * 60 * 60 * 1000;
function calculateTime(endDate = new Date()) {
    const initialDate = new Date(`${FYEAR}-${FMONTH}-${FDAY}`);
    const endDateMs = endDate.getTime();

    let result = {
        years: 0,
        months: 0,
        days: 0
    };
    result.years = endDate.getFullYear() - initialDate.getFullYear();

    let startDate = new Date(`${endDate.getFullYear()}-${FMONTH}-${FDAY}`);
    let NewDayMs = startDate.getTime()
    while ((NewDayMs += DAYMS) <= endDateMs) {
        let nd_month = new Date(NewDayMs).getMonth();
        let nd_day = new Date(NewDayMs).getDate();

        if (nd_day === Number(FDAY)) {
            if (nd_month === Number(FMONTH) - 1) {
                result.years++;
                result.months = 0;
                result.days = 0;
            } else {
            result.months++;
            result.days = 0;
            }
        } else {
            result.days++;
        }
    }
    return result;
}
module.exports = { calculateTime };