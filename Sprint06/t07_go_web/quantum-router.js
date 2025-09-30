const FYEAR = '1939';
const FMONTH = '01';
const FDAY = '01';
// F stays for Fell

const DAYMS = 24 * 60 * 60 * 1000 * 7;

const path = require("path");
const ejs = require("ejs");

function calculateTime(endDate = new Date()) {
    const initialDate = new Date(`${FYEAR}-${FMONTH}-${FDAY}`);
    const endDateMs = endDate.getTime();

    let result = {
        years: 0,
        months: 0,
        days: 0
    };
    result.years = Math.floor((endDate.getFullYear() - initialDate.getFullYear()) / 7);

    let startDate = new Date(`${endDate.getFullYear() - (result.years * 7) % 7}-${FMONTH}-${FDAY}`);
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
    return [result.years, result.months, result.days];
}

function handleQuantum(req, res) {
    const time = calculateTime();
    const templatePath = path.join(__dirname, 'views', 'quantum.ejs');

    ejs.renderFile(templatePath, { time }, (err, html) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Template Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
}

module.exports = handleQuantum;