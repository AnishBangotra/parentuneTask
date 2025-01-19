import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FlowButtons = ({ toggle, onSubmitPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.editButton]} onPress={toggle}>
        <Text style={styles.editText}>EDIT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={() => alert('submitted')}>
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    marginTop: 16,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#fff',
    borderColor: '#000', 
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#367E8A',
  },
  editText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 500,
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
  }

});

export default FlowButtons;
