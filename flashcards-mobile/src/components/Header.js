import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'



const Header = ({title}) => {
    return (
        <Text style={styles.logoTitle}>
            {title}
        </Text>
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