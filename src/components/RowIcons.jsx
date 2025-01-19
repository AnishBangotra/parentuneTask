import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import VoteIcon from '../../assets/icons/VoteIcon';
import ShareIcon from '../../assets/icons/ShareIcon';

const RowIcons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => alert('Voted')}>
        <VoteIcon  />
        <Text style={styles.text}>Vote</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=> alert('Share')}>
        <ShareIcon />
        <Text style={styles.text}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'flex-end', 
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    width: '22%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20, 
  },
  icon: {
    marginRight: 5, 
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default RowIcons;
