import React, {useState} from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer';



const LoginForm = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View>
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
                <Button title="Log in" onPress={()=> console.log("log in")}/>
            </Spacer>
            <Spacer>
                <Button title="Register" onPress={()=> navigation.navigate('Register')}/>
            </Spacer>

            <Spacer>
                <Button buttonStyle={styles.offlineButton} title="Continue offline" onPress={()=> console.log("offline")}/>
            </Spacer>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        marginVertical: 50,
    },
    input:{
        minWidth: 400,
        fontSize: 24,
    },
    offlineButton:{
        marginTop: 50,
        backgroundColor: 'red',
    }
}) 

export default LoginForm;