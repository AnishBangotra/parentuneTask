import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../assets/images/LeftArrow.png';

const Title = () => {
    return(
        <View style={styles.container}>
            {/* <Icon /> */}
            <Text style={styles.text}>Contest Name</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 3
    },
    text: {
        fontWeight: 'bold',
        fontSize: 21
    }
});

export default Title;