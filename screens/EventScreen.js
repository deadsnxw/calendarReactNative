import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { createTable, deleteEvent, fetchEvents, insertEvent, updateEvent } from "../database";

const EventScreen = ({ navigation, route }) => {
    const [events, setEvents] = useState([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const { selectedDay } = route.params;

    useEffect(() => {
        createTable();
        loadEvents();
    }, []);

    const loadEvents = async () => {
        const allEvents = await fetchEvents();
        setEvents(allEvents.filter(event => event.date === selectedDay));
    }

    const addEventHandle = async () => {
        if (name && selectedDay) {
            await insertEvent(name, selectedDay);
            setName('');
            loadEvents();
            navigation.goBack();
        }
    }

    const updateEventHandle = async () => {
        if (editingId && name) {
            await updateEvent(editingId, name);
            setEditingId(null);
            setName('');
            loadEvents();
        }
    }

    const deleteEventHandle = async (id) => {
        await deleteEvent(id);
        loadEvents();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Events for {selectedDay}</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter event name"
            />
            {editingId ? (
                    <Button title="Update Event" onPress={updateEventHandle} style={styles.button} />
                ) :
                <Button title="Add Event" onPress={addEventHandle} style={styles.button} />
            }

            <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.eventItem}>
                        <Text style={styles.eventText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => {
                            setEditingId(item.id);
                            setName(item.name);
                        }}>
                            <Text style={styles.editButton}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteEventHandle(item.id)}>
                            <Text style={styles.deleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noEventsText}>There is no events for this day</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        marginBottom: 20,
        backgroundColor: "#dc05d4",
    },
    eventItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    eventText: {
        fontSize: 18,
    },
    editButton: {
        marginRight: 10,
        color: 'blue',
    },
    deleteButton: {
        color: 'red',
    },
    noEventsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
    }

});

export default EventScreen;