import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [accountCreated, setAccountCreated] = useState(false); // Nuevo estado
    const navigation = useNavigation();

    const handleCreateAccountPressed = async () => {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    passwordRepeat,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAccountCreated(true); // Marcar la cuenta como creada
                Alert.alert('Éxito', 'La cuenta se creó exitosamente'); // Mostrar un aviso
                navigation.navigate('Sign In'); // Navegar a la pantalla de inicio
            } else {
                console.error('Hubo un error en la solicitud.');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    
    const handleSignInPressed = () => {
        navigation.navigate('Sign In');
    };

    const handleTermsPressed = () => {
        console.warn('terminos');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}> Crear Cuenta </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.root}>
                        {/* ... */}
                    </View>
                 </ScrollView>

                <CustomInput
                    placeholder='Usuario'
                    value={username}
                    setValue={setUsername}
                />

                <CustomInput
                    placeholder='Correo Electronico'
                    value={email}
                    setValue={setEmail}
                />

                <CustomInput
                    placeholder='Contraseña'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />

                <CustomInput
                    placeholder='Repetir contraseña'
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />

                <CustomButton
                    onPress={handleCreateAccountPressed}
                    text="Crear cuenta"
                />

                <Text style={styles.text}>
                    Al registrar declaro que acepto los{' '}
                    <Text style={styles.link} onPress={handleTermsPressed}>
                        términos y condiciones
                    </Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    onPress={handleSignInPressed}
                    text="Ya tengo cuenta"
                    type='tertiary'
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create(
    {
        root: {
            alignItems: 'center',
            padding: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#051C60',
            margin: 10,
        },
        text: {
            color: 'grey',
            marginVertical: 10,
        },
        link: {
            color: '#FDB075',
        }
    }
)

export default RegisterScreen;