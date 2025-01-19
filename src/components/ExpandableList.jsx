import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import AddIcon from '../../assets/icons/AddIcon';
import NegativeIcon from '../../assets/icons/NegativeIcon';

const ExpandableList = ({title}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationHeight] = useState(new Animated.Value(0)); 

  const toggleExpand = () => {
    if (isExpanded) {
      Animated.timing(animationHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
      Animated.timing(animationHeight, {
        toValue: 150,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity onPress={toggleExpand}>
          {isExpanded ? <NegativeIcon /> : <AddIcon />}
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.animatedContainer, { height: animationHeight }]}>
        {isExpanded && (
          <View style={styles.list}>
            <Text style={styles.listItem}>1. Lorem ipsum lorem ipsuma lorem ipsuma</Text>
            <Text style={styles.listItem}>2. Lorem ipsum lorem ipsuma lorem ipsuma</Text>
            <Text style={styles.listItem}>3. Lorem ipsum lorem ipsuma lorem ipsuma</Text>
            <Text style={styles.listItem}>4. Lorem ipsum lorem ipsuma lorem ipsuma</Text>
            <Text style={styles.listItem}>5. Lorem ipsum lorem ipsuma lorem ipsuma</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
    color: '#000',
  },
  animatedContainer: {
    overflow: 'hidden',
  },
  list: {
    paddingTop: 16,
  },
  listItem: {
    fontSize: 14,
    color: '#000',
    fontWeight: 400,
    marginBottom: 8,
  },
});

export default ExpandableList;