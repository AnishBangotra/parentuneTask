import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
const PreviewButton = ({ isDisabled }) => {
    return (
      <TouchableOpacity
        onPress={() => alert('Pressed')}
        activeOpacity={0.7}
        style={[styles.button, isDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>PREVIEW</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    button: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 16,
      },
      buttonEnabled: {
        backgroundColor: '#367E8A',
      },
      buttonDisabled: {
        backgroundColor: '#CED2D9',
      },
      buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 500,
      },
});

export default PreviewButton;