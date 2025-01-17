import {useState} from "react";
import {Button, TextInput, View} from "react-native";

const Event = ({ onAddEvent, onClose }) => {
    const [eventName, setEventName] = useState('');

    const handleAddEvent = () => {
        if (eventName.trim()) {
            onAddEvent(eventName);
            setEventName('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Event name"
                value={eventName}
                onChangeText={setEventName}
                />
            <Button title={'Add event'} onPress={handleAddEvent} />
            <Button title={'Close'} onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        marginBottom: 10,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#dadada',
    },
});

export default Event;