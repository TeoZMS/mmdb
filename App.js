import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import SearchScreen from "./screens/SearchScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import WatchlistScreen from "./screens/WatchlistScreen"

export default function App() {
    const Tab = createBottomTabNavigator()
    const Stack = createStackNavigator()

    function Tabs() {
        return (
            <Tab.Navigator screenOptions={{}}>
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} /> }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{ tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} /> }}
                />
                <Tab.Screen
                    name="Watchlist"
                    component={WatchlistScreen}
                    options={{ tabBarIcon: ({ color, size }) => <Ionicons name="eye" color={color} size={size} /> }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})
