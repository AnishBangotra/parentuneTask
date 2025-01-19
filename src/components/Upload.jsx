import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ImageIcon from '../../assets/icons/ImageIcon';
const Upload = ({ request }) => {
    return(
        <TouchableOpacity title="Select Image" onPress={() => request()} style={styles.touchContainer}>
           <ImageIcon />
           <Text style={styles.textStyle}>Upload your child photo</Text>
           <Text style={styles.subTextStyle}>Image Weight: Max 5 MB</Text>
           <Text style={styles.subTextStyle}>Image Format: JPG & PNG</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchContainer: {
        width: 'auto',
        height: 327,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#000000',
        borderRadius: 10,
        marginTop: 20,
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 400
    },
    subTextStyle: {
        fontSize: 12,
        fontWeight: 400,
        textAlign: 'center'
    }    
});

export default Upload;