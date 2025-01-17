import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Header from './Header';
import Day from './Day';
import Event from './Event';
import { getCalendarMatrix } from '../utils/calendarUtils';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleDayPress = (day) => {
        setSelectedDay(day);
    };

    const handleAddEvent = (eventName) => {
        const dateKey = selectedDay.toDateString();
        setEvents((prevEvents) => ({
            ...prevEvents,
            [dateKey]: [...(prevEvents[dateKey] || []), eventName],
        }));
        setSelectedDay(null);
    };

    const handleCloseEvent = () => {
        setSelectedDay(null);
    };

    const calendarMatrix = getCalendarMatrix(currentDate);

    return (
        <TouchableWithoutFeedback onPress={handleCloseEvent}>
            <View style={styles.container}>
                <Header
                    currentDate={currentDate}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                    onToday={handleToday}
                />
                <View style={styles.daysContainer}>
                    {calendarMatrix.map((week, index) => (
                        <View key={index} style={styles.weekRow}>
                            {week.map((day, dayIndex) => (
                                <Day
                                    key={dayIndex}
                                    day={day}
                                    isCurrentMonth={day.getMonth() === currentDate.getMonth()}
                                    isToday={day.toDateString() === new Date().toDateString()}
                                    onDayPress={handleDayPress}
                                    hasEvent={events[day.toDateString()]?.length > 0}
                                />
                            ))}
                        </View>
                    ))}
                </View>
                {selectedDay && (
                    <Event
                        onAddEvent={handleAddEvent}
                        onClose={handleCloseEvent}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    daysContainer: {
        marginTop: 10,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default Calendar;