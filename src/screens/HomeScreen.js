import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { fetchUserData } from '../utils/api';
import UserList from '../screens/UserList';
import Chart from '../components/Chart';
import ErrorHandler from '../components/ErrorHandler';

const HomeScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleButtonPress = async () => {
    if (inputValue.length < 4) {
      setErrorMessage('Min length is 4 characters.');
      return;
    }
    if (inputValue.includes('doublevpartners')) {
      setErrorMessage('Cannot search this word.');
      return;
    }
    setUsers((await fetchUserData(inputValue)).items);
    if(users.length === 0) {
      setErrorMessage('Nothing was found.');
      return;
    }
    setErrorMessage('');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {errorMessage !== '' && <ErrorHandler message={errorMessage} />}
        <Text style={styles.centeredTitle}>List GitHub users based on input search.</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Input placeholder="Type your input query" value={inputValue} onChangeText={setInputValue} />
          </View>
          <View style={styles.col}>
            <Button title="Search users" onPress={handleButtonPress} />
          </View>
        </View>
        <View style={styles.row}>
          {users && users.length > 0 && <UserList users={users} />}
        </View>
      </View>
      <ScrollView horizontal>
        {users && users.length > 0 && <Chart users={users} />}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  col: {
    paddingHorizontal: 10,
  },
  centeredTitle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default HomeScreen;
