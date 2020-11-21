import React, {useState} from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer';
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import LoginForm from '../forms/LoginForm';



const LoginScreen = ({navigation}) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <Header title="Flashcards App" />
                <LoginForm navigation={navigation} />
            </ScrollView>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        marginVertical: 25,
    },
}) 

export default LoginScreen;