import React from 'react';
import { SafeAreaView } from 'react-native';
import Calendar from './components/Calendar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from './screens/EventScreen';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="Add Event" component={EventScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;