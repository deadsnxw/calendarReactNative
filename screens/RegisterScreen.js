import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Fill in all fields");
            return;
        }
        const existingUser = await AsyncStorage.getItem(username);
        if (existingUser) {
            Alert.alert("Error", "User already exists");
            return;
        }
        await AsyncStorage.setItem(username, JSON.stringify({ password, tasks: [] }));
        Alert.alert("Success", "User registered!");
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Button title="Register" onPress={registerUser} />
            <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }
});

export default RegisterScreen;
