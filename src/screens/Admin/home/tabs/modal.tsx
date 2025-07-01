import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, moderateScale } from '../../../../styles/admin/theme';

interface CommonModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  onlyOk?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onlyOk = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            {!onlyOk && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.okBtn} onPress={onConfirm}>
              <Text style={styles.okText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0008',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(15),
    color: colors.text.secondary,
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    gap: moderateScale(10),
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  okBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  cancelText: {
    color: colors.text.secondary,
    fontWeight: '600',
  },
  okText: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default CommonModal;