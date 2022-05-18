import React, {useContext, useState} from "react";
import { ScrollView, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Form/input";
import { Button } from "../../components/Form/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Container,
    Content,
    CreateAccount,
    CreateAccountTitle,
    Title,
    Logo,
    Icon,
    ForgotPasswordButton,
    ForgotPasswordTitle,
} from "./styles";
import logo from "../../assets/logo.png";
import { InputControl } from "../../components/Form/inputControl";
import { useAuth } from "../../context/AuthContext";

interface ScreenNavigationProp {
    navigate: (screen: string) => void;
}

interface IFormInputs {
    [name: string]: any;
}

const formSchema = yup.object({
    email: yup.string().email("Email inválido.").required("Informe o email."),
    password: yup.string().required("Informe a senha."),
});

export const SignIn: React.FunctionComponent = () => {
    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FieldValues>({
        resolver: yupResolver(formSchema),
    });
    const { navigate } = useNavigation<ScreenNavigationProp>();

    const handleSignIn = (form: IFormInputs) => {
        const data = {
            email: form.email,
            password: form.password,
        };
        try {
            setLoading(true);
            signIn(data);
        } catch (error) {
            Alert.alert(
                "Erro na autenticação",
                "Ocorreu um erro ao fazer login, verifique as credenciais."
            );
        }
    };

    return (
        <KeyboardAvoidingView
            enabled
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flex: 1 }}
            >
                <Container>
                    <Content>
                        <Logo source={logo} />
                        <View>
                            <Title>Faça seu logon</Title>
                        </View>
                        <InputControl
                            autoCapitalize="none"
                            autoCorrect={false}
                            control={control}
                            name="email"
                            placeholder="Email"
                            keyboardType="email-address"
                            error={errors.email && errors.email.message}
                        />
                        <InputControl
                            control={control}
                            name="password"
                            placeholder="Senha"
                            autoCorrect={false}
                            secureTextEntry
                            error={errors.password && errors.password.message}
                        />
                        <Button
                            title="Entrar"
                            disabled={
                                loading || errors.email || errors.password
                            }
                            onPress={handleSubmit(handleSignIn)}
                        />
                        <ForgotPasswordButton
                            onPress={() => navigate("ForgotPassword")}
                        >
                            <ForgotPasswordTitle>
                                Esqueci minha senha
                            </ForgotPasswordTitle>
                        </ForgotPasswordButton>
                    </Content>
                </Container>
            </ScrollView>
            <CreateAccount
                onPress={() => {
                    navigate("SignUp");
                }}
            >
                <Icon name="log-in" />
                <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
            </CreateAccount>
        </KeyboardAvoidingView>
    );
};
