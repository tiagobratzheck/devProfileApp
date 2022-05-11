import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { SignUp } from "./src/pages/SignUp";
import {
    useFonts,
    Inter_300Light,
    Inter_700Bold
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FunctionComponent = () => {
    const [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer>
            <ThemeProvider theme={theme}>
                <SignUp />
            </ThemeProvider>
        </NavigationContainer>
    );
};

export default App;