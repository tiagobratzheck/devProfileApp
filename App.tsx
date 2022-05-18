import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes";
import {
    useFonts,
    Inter_300Light,
    Inter_700Bold
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App: React.FunctionComponent = () => {
    const [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <StatusBar backgroundColor="transparent" translucent />
                <ThemeProvider theme={theme}>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </ThemeProvider>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;