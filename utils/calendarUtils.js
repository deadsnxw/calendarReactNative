export const getCalendarMatrix = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const calendarMatrix = [];
    let week = [];

    for (let i = 0; i < startDay; i++) {
        const prevDay = new Date(startOfMonth);
        prevDay.setDate(prevDay.getDate() - (startDay - i));
        week.push(prevDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
        week.push(currentDay);

        if (week.length === 7) {
            calendarMatrix.push(week);
            week = [];
        }
    }

    let nextDay = 1;
    while (week.length > 0 && week.length < 7) {
        const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, nextDay++);
        week.push(nextDate);
    }
    if (week.length > 0) calendarMatrix.push(week);

    return calendarMatrix;
};
