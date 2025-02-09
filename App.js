import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Calendar from './components/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from './screens/EventScreen';
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator();

function App() {
    const [user, setUser] = useState(null);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login">
                    {props => <LoginScreen {...props} setUser={setUser} />}
                </Stack.Screen>
                <Stack.Screen name="Calendar">
                    {props => <Calendar {...props} user={user} />}
                </Stack.Screen>
                <Stack.Screen name="Add Event" component={EventScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;