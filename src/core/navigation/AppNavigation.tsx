import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainStackParamList } from "../types/AppNavigationType";
import CustomBottomNavigation from "../components/CustomBottomNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsDiscoverScreen from "../../presentation/discover/EventsDiscoverScreen";
import { useTheme } from "../hooks/useTheme";
import MyEventsScreen from "../../presentation/myEvents/MyEventsScreen";
import EventDetailsScreen from "../../presentation/eventDetails/EventDetailsScreen";
import HostDetailsScreen from "../../presentation/hostDetails/HostDetailsScreen";



const RootStack = createNativeStackNavigator<MainStackParamList>();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Discover" component={EventsDiscoverScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

function TabsNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    elevation: 0,
                },
                sceneStyle: {
                    backgroundColor: colors.background,
                },
            }}
            tabBar={(props: any) => <CustomBottomNavigation {...props} />}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeStackNavigator}
                options={{ title: "Home" }}
            />
            <Tab.Screen 
                name="MyEvents" 
                component={MyEventsScreen}
                options={{ title: "My Events" }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigation() {
    const { colors } = useTheme();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Group>
                <RootStack.Screen 
                    name="Tabs" 
                    component={TabsNavigator}
                    options={{ headerShown: false }}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: "card" }}>
                <RootStack.Screen
                    name="EventDetails"
                    component={EventDetailsScreen}
                    options={({ route }) => ({
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal",
                        title: route.params.event.title,
                        headerStyle: {
                            backgroundColor: colors.background,
                        },
                        headerTintColor: colors.textPrimary,
                        headerTitleStyle: {
                            color: colors.textPrimary,
                            fontWeight: "600",
                        },
                    })}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: "card" }}>
                <RootStack.Screen
                    name="HostDetails"
                    component={HostDetailsScreen}
                    options={{
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal",
                        title: "Host Details",
                        headerStyle: {
                            backgroundColor: colors.background,
                        },
                        headerTintColor: colors.textPrimary,
                        headerTitleStyle: {
                            color: colors.textPrimary,
                            fontWeight: "600",
                        },
                    }}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );
}
