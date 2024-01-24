// UserList.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Table from '../components/Table';
import { useNavigation } from '@react-navigation/native';

const UserList = ({ users }) => {
  const navigation = useNavigation();
  const headers = [
    { value: 'login', displayColName: 'Nombre' },
    { value: 'id', displayColName: 'Identificador único' },
  ];

  const onRowClick = (row) => {
    const userName = row[0];
    navigation.navigate('UserDetail', { userName });
  }

  return (
    <View style={styles.container}>
      <Table theads={headers} trows={users} onRowClick={onRowClick}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default UserList;
