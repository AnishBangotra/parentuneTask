import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const UserInfo = ({ onInputChange }) => {
  const [form, setForm] = useState({
    fullName: '',
    date: '',
    month: '',
    year: '',
  });

  const handleInputChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    onInputChange(updatedForm);
  };

  // const isValidDate = (day, month, year) => {
  //   const inputDate = new Date(year, month - 1, day);
  //   const today = new Date();
  //   return (
  //     inputDate <= today && // Date is not in the future
  //     inputDate.getDate() === day && // Valid day
  //     inputDate.getMonth() + 1 === month && // Valid month
  //     inputDate.getFullYear() === year // Valid year
  //   );
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tell us more about your munchkin</Text>
      <Text style={styles.subheading}>Enter your little one's name</Text>
      <TextInput
        style={styles.fullWidthInput}
        placeholder="Full name"
        placeholderTextColor="#242F35"
        value={form.fullName}
        onChangeText={(value) => handleInputChange('fullName', value)}
      />
      <Text style={styles.subheading}>When was your sunshine born?</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="DD"
          placeholderTextColor="#242F35"
          keyboardType="numeric"
          maxLength={2}
          value={form.date}
          onChangeText={(value) => handleInputChange('date', value)}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          placeholder="MM"
          placeholderTextColor="#242F35"
          keyboardType="numeric"
          maxLength={2}
          value={form.month}
          onChangeText={(value) => handleInputChange('month', value)}
        />
        <TextInput
          style={[styles.input, styles.yearInput]}
          placeholder="YYYY"
          placeholderTextColor="#242F35"
          keyboardType="numeric"
          maxLength={4}
          value={form.year}
          onChangeText={(value) => handleInputChange('year', value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 16,
    color: '#000',
  },
  subheading: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 16,
    color: '#242F35',
  },
  fullWidthInput: {
    width: '90%',
    height: 57,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 21,
    height: 57,
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  dateInput: {
    width: 'auto'
  },
  yearInput: {
    width: 'auto'
  },
});

export default UserInfo;
