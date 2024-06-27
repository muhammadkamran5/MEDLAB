import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomTabBar = ({ navigationState, jumpTo, tabs }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab : any, index : any) => (
        <View key={tab.key} style={styles.tabContainer}>
          <TouchableOpacity onPress={() => jumpTo(tab.key)}>
            <Text style={[styles.tabText, navigationState.index === index && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
          {navigationState.index === index && (
            <View style={styles.activeIndicator}></View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  tabContainer: {
    alignItems: 'center',
  },
  tabText: {
    color: '#777',
    fontSize: 16,
  },
  activeTabText: {
    color: '#225B6E',
  },
  activeIndicator: {
    height: 2,
    backgroundColor: '#225B6E',
    marginTop: 3,
    width: '80%',
  },
});

export default CustomTabBar;
