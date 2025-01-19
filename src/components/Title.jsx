import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LeftArrow from '../../assets/icons/LeftArrow';

const Title = () => {
    return(
        <View style={styles.container}>
            <LeftArrow />
            <Text style={styles.text}>Contest Name</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25
    },
    text: {
        fontWeight: 'bold',
        fontSize: 21,
    }
});

export default Title;