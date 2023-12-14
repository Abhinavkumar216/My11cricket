import Toast from 'react-native-toast-message';
// import { Toast } from 'react-native-toast-message/lib/src/Toast';

export function isValidMobile(mobile: string) {
  // Check if the mobile number is a valid length.
  if (!mobile) {
    console.log("Mobile no can't blank");
    showToast({type: 'info', heading: 'Mobile no can"t blank', subheading: 'Please check mobile no.'});
    return false;
  }
  if (mobile && mobile.length !== 10) {
    // console.warn('Mobile no must be 10 Digit');
    showToast({type:'error',heading:'Invalid Mobile Number',subheading:"Mobile no must be 10 Digit"});
    return false;
  }

  // Check if the mobile number is a valid format.
  const regExp = /^[0-9]{10}$/;
  if (!regExp.test(mobile)) {
    // console.warn('Invalid Mobile no.');
    showToast({type:'error',heading:'Invalid Mobile Number',subheading:"Your Mobile No is Invalid"});
    return false;
  }

  // The mobile number is valid.
  return true;
}

interface toast {
  type: 'success' | 'error' | 'info';
  heading: string;
  subheading?: string;
}

export const showToast = ({type, heading, subheading}: toast) => {
  Toast.show({
    type: type,
    text1: heading,
    text2: subheading,
  });
};
