import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../utils/ThemeContext';

const LoginScreen = ({ navigation, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { theme, toggleTheme } = useContext(ThemeContext);

    const loginUser = async () => {
        const userData = await AsyncStorage.getItem(username);
        if (!userData) {
            Alert.alert("Error", "User not found");
            return;
        }
        const parsedUser = JSON.parse(userData);
        if (parsedUser.password !== password) {
            Alert.alert("Error", "Incorrect password");
            return;
        }
        await AsyncStorage.setItem("loggedInUser", JSON.stringify({ username }));
        setUser({ username });
        navigation.navigate("Calendar");
    };

    return (
        <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
            <Text style={[styles.title, theme === 'dark' && styles.darkText]}>Login</Text>
            <TextInput
                style={[styles.input, theme === 'dark' && styles.darkInput]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, theme === 'dark' && styles.darkInput]}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={loginUser} />
            <Button title="Register" onPress={() => navigation.navigate("Register")} />
            <Button title="Toggle Theme" onPress={toggleTheme} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    darkInput: {
        backgroundColor: '#444',
        color: '#fff',
        borderColor: '#555',
    },
});

export default LoginScreen;