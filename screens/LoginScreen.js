import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Button title="Login" onPress={loginUser} />
            <Button title="Register" onPress={() => navigation.navigate("Register")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }
});

export default LoginScreen;