
const Time = () => {
    const date = new Date()
    const Year = date.getFullYear().toString()

    const Month = (date.getMonth() + 1).toString()
    const StanderMonth = date.getMonth() + 1 < 10 ? '0' + Month : Month
    const Day = date.getDate().toString()
    const StanderDay = date.getDate() < 10 ? '0' + Day : Day
    const DayNumber = date.getDate()
    const MonthNumber = date.getMonth() + 1
    const YearNumber = date.getFullYear()

    const FullTime = Year + '-' + StanderMonth + '-' + StanderDay
    const YearAndMonth = Year + '-' + Month
    let MonthAndDay
    if (parseInt(Day) < 10) {
        MonthAndDay = Month + '-0' + Day
    } else {
        MonthAndDay = Month + '-' + Day
    }
    return { Year, Month, MonthNumber, Day, DayNumber, FullTime, YearAndMonth, MonthAndDay, YearNumber, StanderMonth, StanderDay }
}
export default Time