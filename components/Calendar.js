import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Day from './Day';
import { getCalendarMatrix } from '../utils/calendarUtils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {fetchEvents} from "../database";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const navigation = useNavigation();
    const [eventDays, setEventDays] = useState(new Set());

    useFocusEffect(
        React.useCallback(() => {
            const loadEvents = async () => {
                const events = await fetchEvents();
                const eventsByDate = {};
                events.forEach(event => {
                    eventsByDate[event.date] = eventsByDate[event.date] || [];
                    eventsByDate[event.date].push(event);
                });
                setEvents(eventsByDate);
                setEventDays(new Set(events.map(event => event.date)));
            };
            loadEvents();
        }, [])
    );


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
        const dateKey = day.toISOString().split('T')[0];
        setSelectedDay(dateKey);
        navigation.navigate('Add Event', { selectedDay: dateKey });
    };

    const calendarMatrix = getCalendarMatrix(currentDate);

    return (
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
                        {week.map((day, dayIndex) => {
                            const dateKey = day.toISOString().split('T')[0];
                            return (
                                <Day
                                    key={dayIndex}
                                    day={day}
                                    isCurrentMonth={day.getMonth() === currentDate.getMonth()}
                                    isToday={dateKey === new Date().toISOString().split('T')[0]}
                                    onDayPress={() => handleDayPress(day)}
                                    hasEvent={eventDays.has(dateKey)}
                                />
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
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