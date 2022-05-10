import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";
import { Home } from "./src/pages/Home";
import {
    useFonts,
    Inter_300Light,
    Inter_700Bold
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

const App: React.FunctionComponent = () => {
    const [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

     return (
         <ThemeProvider theme={theme}>
             <Home />
         </ThemeProvider>
     );
};

export default App;