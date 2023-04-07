import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import SearchScreen from "./screens/SearchScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import WatchlistScreen from "./screens/WatchlistScreen"
import { Colors } from "./constants/colors"
import Search from "./components/UI/SearchBar"
import MovieScreen from "./screens/MovieScreen"
import IconButton from "./components/UI/IconButton"
import { useEffect } from "react"
import { init } from "./utils/database"

export default function App() {
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    useEffect(() => {
        init()
    }, [])

    function Tabs() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 16 },
                    headerTintColor: Colors.primary500,
                    headerStyle: { backgroundColor: Colors.gray200, elevation: 0, shadowOpacity: 0 },
                    tabBarActiveTintColor: Colors.primary500,
                    tabBarInactiveTintColor: Colors.gray900,
                    tabBarStyle: { borderTopWidth: 0, backgroundColor: Colors.gray200, height: 40 },
                    tabBarShowLabel: false
                }}
                sceneContainerStyle={{ backgroundColor: "black" }}
            >
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />
                    }}
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
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Movie"
                        component={MovieScreen}
                        options={{
                            headerTintColor: Colors.primary500,
                            headerStyle: { backgroundColor: Colors.gray200 },
                            contentStyle: { backgroundColor: "black" },
                            title: ""
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 15
    }
})
