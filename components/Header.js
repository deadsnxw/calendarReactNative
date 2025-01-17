import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Header = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    return (
        <View style={styles.headerContainer}>
            <Button color="#dc05d4" title="<" onPress={onPrevMonth} />
            <Text style={styles.headerText}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <Button color="#dc05d4" title=">" onPress={onNextMonth} />
            <Button color="#dc05d4" title="Today" onPress={onToday} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Header;
