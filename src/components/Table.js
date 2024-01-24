// Table.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Table = ({ theads, trows, onRowClick }) => {
  trows = trows.slice(0, 10).map(obj => theads.map(header => obj[header.value]));
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {theads.map((header, index) => (
          <Text key={index} style={styles.tableHeader}>
            {header.displayColName}
          </Text>
        ))}
      </View>
      {trows.map((trow, rowIndex) => (
        <TouchableOpacity
          key={rowIndex}
          onPress={() => onRowClick && onRowClick(trow)}
        >
          <View style={styles.tableRow}>
            {trow.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.tableCell}>
                {cell}
              </Text>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    padding: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 15,
    textAlign: 'center',
  },
});

export default Table;
