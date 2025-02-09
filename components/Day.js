import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Day = ({ day, isCurrentMonth, isToday, onDayPress, hasEvent }) => {
    return (
        <TouchableOpacity onPress={() => onDayPress(day)}>
            <View
                style={[
                    styles.dayContainer,
                    !isCurrentMonth && styles.otherMonth,
                    isToday && styles.today,
                ]}
            >
                <Text style={styles.dayText}>{day.getDate()}</Text>
                {hasEvent && <View style={styles.eventIndicator} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        borderRadius: 20,
    },
    dayText: {
        fontSize: 16,
    },
    otherMonth: {
        backgroundColor: '#dadada',
    },
    today: {
        backgroundColor: '#dc05d4',
        color: '#fff',
    },
    eventIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 2,
    },
});

export default Day;
