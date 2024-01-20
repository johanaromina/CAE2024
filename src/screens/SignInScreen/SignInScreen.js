import React, { useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const handleSignInPressed = async () => {
        try {
            const response = await fetch('http://localhost:3000/registrationrequest?id=1&password=' + password, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    // Lógica para manejar la respuesta del servidor
                    navigation.navigate('Home');
                } else {
                    console.error('Usuario o contraseña incorrectos.');
                }
            } else {
                console.error('Hubo un error en la solicitud.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    

    const handleForgotPasswordPressed = () => {
        // Lógica para la pantalla de "Olvidé mi contraseña"
        navigation.navigate('Forgot Password');
    };

    const handleRegisterPressed = () => {
        // Lógica para la pantalla de "Registro"
        navigation.navigate('Register');
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View
                style={styles.root}
            >
                <Image
                    source={require('../../../assets/pngwing.com (1).png')}
                    style={styles.image}
                />

                <CustomInput
                    placeholder='Correo Electronico'
                    value={username}
                    setValue={setUsername}
                />

                <CustomInput
                    placeholder='Contraseña'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomButton
                    onPress={handleSignInPressed}
                    text="Ingresar"
                />

                <CustomButton
                    onPress={handleForgotPasswordPressed}
                    text="Olvidé mi contraseña"
                    type='tertiary'
                />

                <SocialSignInButtons/>

                <CustomButton
                    onPress={handleRegisterPressed}
                    text="No tengo cuenta"
                    type='tertiary'
                />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        root: {
            alignItems: 'center',
            padding: 20,
        },
        image: {
            width: '10%',
            height: '45%',
            marginBottom: 2,
          },
    }
)

export default SignInScreen;
