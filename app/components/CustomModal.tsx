import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { SPACING } from '../styles/responsive';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen';
}

export default function CustomModal({ 
  isOpen, 
  onClose, 
  children,
  animationType = 'slide',
  presentationStyle = 'pageSheet'
}: CustomModalProps) {
  return (
    <Modal
      visible={isOpen}
      animationType={animationType}
      presentationStyle={presentationStyle}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
}); 