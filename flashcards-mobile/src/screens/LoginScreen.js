import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer';
import Header from '../components/Header';



const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Spacer>
                <Header title="Flashcards App" />
            </Spacer>
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
            <View style={styles.offlineSection}>
                <Spacer>
                    <Button buttonStyle={{backgroundColor: 'red'}} title="Start offline" onPress={()=> console.log("Offline!")}/>
                </Spacer>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginVertical: 50,
    },
    input:{
        minWidth: 400,
        fontSize: 24,
    },
    offlineSection: {
        marginTop: 50,
    },
}) 

export default LoginScreen;