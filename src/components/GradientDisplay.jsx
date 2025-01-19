import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientDisplay = ({ name, age }) => {
  return (
        <LinearGradient
        colors={['#FFE1C2','#FFE0E3']} 
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} 
        >
        <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{age} Yrs</Text>
        </View>
        </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 25,
    borderRadius: 10,
    width: '100%',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignContent: 'center',
    borderColor: '#C4C4C4',
    borderBottomWidth: 1
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: '#000',
  },
  value: {
    fontSize: 14,
    color: '#000',
  },
});

export default GradientDisplay;
