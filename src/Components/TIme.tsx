
const Time = () => {
    const date = new Date()
    const Year = date.getFullYear().toString()
    const Month = (date.getMonth() + 1).toString()
    const Day = date.getDate().toString()
    const FullTime = Year + '-' + Month + '-' + Day
    const YearAndMonth = Year + '-' + Month
    const MonthAndDay = Month + '-' + Day
    return { Year, Month, Day, FullTime, YearAndMonth, MonthAndDay }
}
export default Time