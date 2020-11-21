import React, {useState} from 'react';
import { View, StyleSheet, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Input } from 'react-native-elements'
import Spacer from '../components/Spacer';



const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <Spacer>
                    <Input 
                        label="Username"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        autoCapitalize="none"
                        autoCorrect={false} 
                        style={styles.input}
                        leftIcon={{ type: 'font-awesome', name: 'sign-in' }}
                    />
                </Spacer>
                <Spacer>
                    <Input 
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize="none"
                        autoCorrect={false} 
                        style={styles.input}
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    />
                </Spacer>

                <Spacer>
                    <Input 
                        label="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        style={styles.input}
                        secureTextEntry
                    />
                </Spacer>
                <Spacer>
                    <Input 
                        label="Confirm password"
                        value={passwordConfirm}
                        onChangeText={text => setPasswordConfirm(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        style={styles.input}
                        secureTextEntry
                    />
                </Spacer>
                <Spacer>
                    <Button title="Register" onPress={()=> navigation.goBack()}/>
                </Spacer>
            </ScrollView>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginVertical: 10,
    },
    input:{
        minWidth: 400,
        fontSize: 24,
    },
    offlineSection: {
        marginTop: 50,
    },
    offlineButton: {
        backgroundColor: 'red',
    }
});

export default RegisterScreen;