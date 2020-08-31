
const Time = () => {
    const date = new Date()
    const Year = date.getFullYear().toString()
    const Month = (date.getMonth() + 1).toString()
    const Day = date.getDate().toString()
    const DayNumber = date.getDate()
    const MonthNumber = date.getMonth() + 1
    const YearNumber = date.getFullYear()
    const FullTime = Year + '-' + Month + '-' + Day
    const YearAndMonth = Year + '-' + Month
    const MonthAndDay = Month + '-' + Day
    return { Year, Month, MonthNumber, Day, DayNumber, FullTime, YearAndMonth, MonthAndDay, YearNumber }
}
export default Time