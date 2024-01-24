// ErrorMessage.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const timeout = setTimeout(() => {
      if (isMounted) {
        setIsVisible(false);
        if (onClose) {
          onClose(); // Cerrar el mensaje de error si onClose está proporcionado
        }
      }
    }, 5000); // 5000 milisegundos (ajusta según sea necesario)

    return () => {
      isMounted = false;
      clearTimeout(timeout); // Limpiar el temporizador al desmontar el componente
      if (onClose && isVisible) {
        onClose(); // Cerrar el mensaje de error si onClose está proporcionado durante el desmontaje
      }
    };
  }, [message, onClose, isVisible]);

  // Mostrar el mensaje de error cada vez que el componente se monta
  useEffect(() => {
    setIsVisible(true);
  }, [message]);

  return (
    isVisible && (
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorMessage;
