import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import Spacer from './Spacer';



const Header = ({title}) => {
    return (
        <Spacer>
            <Text style={styles.logoTitle}>
                {title}
            </Text>
        </Spacer>
    );
}


const styles = StyleSheet.create({
    logoTitle:{
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 'bold'
    }
});

export default Header;