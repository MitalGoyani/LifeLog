import Toast from 'react-native-toast-message';
import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

const success = (message, onHide) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    topOffset: Platform.OS == 'android' ? 10 : 40,
    visibilityTime: 2500,
    text1Style: styles.successText1Styles,
    text2Style: styles.successText2Styles,
    onHide: () => onHide && onHide()
  });
}

const error = (message, onHide) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    topOffset: Platform.OS == 'android' ? 10 : 40,
    visibilityTime: 5000,
    text1Style: styles.errorText1Styles,
    text2Style: styles.errorText2Styles,
    onHide: () => onHide && onHide()
  });
}
const styles = StyleSheet.create({
  errorText1Styles: {
    fontSize: 14,
    color: colors.red,
    fontFamily: 'Montserrat-Bold'
  },
  errorText2Styles: {
    fontSize: 13,
    color: colors.black,
    fontFamily: 'Montserrat-Bold'
  },
  successText1Styles: {
    fontSize: 14,
    color: colors.green,
    fontFamily: 'Montserrat-Bold'
  },
  successText2Styles: {
    fontSize: 13,
    color: colors.black,
    fontFamily: 'Montserrat-Bold'
  }
})

export default {
  success,
  error,
};
