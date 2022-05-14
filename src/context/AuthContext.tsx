import React, { useEffect } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../model/user";

// Interface do estado do usuário
interface IAuthState {
    token: string;
    user: IUser;
}

// Interface das credenciais do usuário
interface ICredentials {
    email: string;
    password: string;
}

// Interface utilizada na criação do contexto
interface IAuthContext {
    user: IUser;
    signIn(credentials: ICredentials): void;
}

// Interface do children utilizado no AuthProvider
interface IProps {
    children: React.ReactElement;
}

// Definição do contexto
export const AuthContext = React.createContext<IAuthContext>(
    {} as IAuthContext
);

// Constantes com as definições dos espaços em memórias
const tokenData = "@DevProfile:token";
const userData = "@DevProfile:user";

// AuthProvider responsável pela definição dos métodos e variáveis disponíveis no contexto
export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
    const [data, setData] = React.useState<IAuthState>({} as IAuthState);

    useEffect(() => {
        async function loadAuthData() {
            const token = await AsyncStorage.getItem(tokenData);
            const user = await AsyncStorage.getItem(userData);

            if (token && user) {
                setData({ token, user: JSON.parse(user) });
            }
        }
        loadAuthData();
    }, []);

    const signIn = async ({ email, password }: ICredentials) => {
        try {
            const response = await api.post("sessions", {
                email,
                password,
            });
            const { token, user } = response.data;
            await AsyncStorage.setItem(tokenData, token);
            await AsyncStorage.setItem(userData, JSON.stringify(user));
            setData({ token, user });
        } catch (error) {           
            Alert.alert(
                "Erro na autenticação",
                "Ocorreu um erro ao fazer login, verifique as credenciais."
            );
        }
    };

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
