import React, {type FC, memo} from 'react';
import {Modal, type ModalProps, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Button from './Button';
import Typography from './Typography';
import { COLORS } from '@/constants/colors';

interface ConfirmationDialogProps extends ModalProps {
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  content?: string;
  cancelTitle?: string;
  confirmTitle?: string;
  loading?: boolean;
  loadingText?: string;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = props => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={props.onRequestClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Typography className='mb-4' variant="header6">{props.title || 'Title'}</Typography>
            <Typography variant="body1" className='text-secondary-main'>{props.content || ''}</Typography>
            <View style={styles.modalActions}>
              <Button
                disabled={props?.loading}
                onPress={props.onCancel}
                title={props.cancelTitle || 'Cancel'}
                size="small"
                color="secondary"
              />
              <Button
                disabled={props?.loading}
                onPress={props.onConfirm}
                variant="contained"
                size="small"
                color="error"
                title={
                  props?.loading
                    ? props?.loadingText || 'Loading...'
                    : props.confirmTitle || 'Confirm'
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default memo(ConfirmationDialog);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  modalView: {
    maxWidth: 360,
    minWidth: '100%',
    backgroundColor: COLORS.background.paper,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
    shadowColor: COLORS.common.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalActions: {
    flexDirection: 'row',
    columnGap: 12,
    marginTop: 32,
    justifyContent: 'flex-end',
  },
});
