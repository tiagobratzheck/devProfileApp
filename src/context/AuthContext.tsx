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
    signOut(): void;
    updateUser(user: IUser): void;
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
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
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
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setData({ token, user });
        } catch (error) {           
            Alert.alert(
                "Erro na autenticação",
                "Ocorreu um erro ao fazer login, verifique as credenciais."
            );
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem(tokenData);
        await AsyncStorage.removeItem(userData);
        setData({} as IAuthState);
    };

    const updateUser = async (user: IUser) => {
        await AsyncStorage.setItem(userData, JSON.stringify(user));
        setData({
            user,
            token: data.token,
        });
    };

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContext => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado em um AuthProvider.");
    }

    return context;
};
