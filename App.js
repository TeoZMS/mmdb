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

export default function App() {
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    function Tabs() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 16 },
                    headerTintColor: Colors.primary500,
                    headerStyle: { backgroundColor: Colors.gray200 },
                    tabBarActiveTintColor: Colors.primary500,
                    tabBarActiveBackgroundColor: Colors.gray200,
                    tabBarInactiveBackgroundColor: Colors.gray300,
                    tabBarInactiveTintColor: "white",
                    tabBarStyle: { height: 60, borderTopWidth: 0 }
                }}
                sceneContainerStyle={{ backgroundColor: Colors.gray100 }}
            >
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} /> }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{
                        title: "Favorite Movies",
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
                <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: Colors.accent500 } }}>
                    <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
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
