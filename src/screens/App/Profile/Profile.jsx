import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {MMKV} from 'react-native-mmkv';
import {TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {UserAPI, useUserUpdateMutation} from '../../../Services/API/UserAPI';
import {showToast} from '../../../Services/Functions/AuthFunction';
import {setuser, userstate} from '../../../Services/State/userSlice';
import ButtonFull from '../../../components/ButtonFull';

const Profile = () => {
  const user = useSelector(userstate);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(user);

  const [CallUserUpdate] = useUserUpdateMutation();

  const storage = useMemo(() => new MMKV(), []);

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [pan, setPan] = useState(user?.paymentCredentials?.pan);
  const [upi, setupi] = useState(user?.paymentCredentials?.upi);
  const [account, setAccount] = useState(
    user?.paymentCredentials?.accountNumber,
  );
  const [ifsc, setIfsc] = useState(user?.paymentCredentials?.ifsc);

  const UserUpdate = async () => {
    // if (!email) {
    //   showToast({
    //     type: 'info',
    //     heading: 'Invalid',
    //     subheading: 'Invalid Email',
    //   });
    //   return;
    // }
    // if (!name) {
    //   showToast({type: 'info', heading: 'Invalid', subheading: 'Invalid Name'});
    //   return;
    // }
    var result = /^[\w.-]+@[\w.-]+$/;
    var AlphaNumeric = /^[a-zA-Z0-9]*$/;
    var numeric = /^[0-9]*$/;

    if (!pan || !name || !upi || !ifsc) {
      // ToastErrorShow('Please Fill all Field. Required for withdrawal Money');
      showToast({
        type: 'info',
        heading: 'Missing Field',
        subheading: 'Please Fill all Field.',
      });
      return;
    }
    if (AlphaNumeric.test(pan) !== true) {
      // ToastErrorShow('Please Enter Valid PAN Number');
      showToast({
        type: 'info',
        heading: 'Invalid PAN No.',
        subheading: 'Please Enter Valid PAN Number',
      });
      return;
    }
    if (result.test(upi) !== true) {
      // ToastErrorShow('Please Enter Valid UPI');
      showToast({
        type: 'info',
        heading: 'Invalid UPI',
        subheading: 'Please Enter Valid UPI',
      });
      return;
    }
    if (numeric.test(account) !== true) {
      // ToastErrorShow('Please Enter Valid Account Number');
      showToast({
        type: 'info',
        heading: 'Invalid Account Number',
        subheading: 'Please Enter Valid Account Number',
      });
      return;
    }
    if (AlphaNumeric.test(ifsc) !== true) {
      // ToastErrorShow('Please Enter Valid IFSC Code');
      showToast({
        type: 'info',
        heading: 'Invalid IFSC Code',
        subheading: 'Please Enter Valid IFSC Code',
      });
      return;
    }

    try {
      const payload = await CallUserUpdate({
        name: name,
        email: email,
        accountNumber: account,
        ifsc: ifsc,
        pan: pan,
        upi: upi,
      }).unwrap();
      showToast({
        type: 'success',
        heading: 'Profile Updated',
        subheading: 'Profile Updated successfully',
      });
      navigation.goBack();
    } catch (error) {
      // console.error('error in user update', error);
      showToast({
        type: 'error',
        heading: 'Error ',
        subheading: 'error in user update',
      });
    }
  };

  let options = {
    mediaType: 'photo',
    presentationStyle: 'pageSheet',
    maxHeight: 250,
    maxWidth: 250,
    quality: 1,
    selectionLimit: 1,
  };

  const PicImage = async () => {
    const image = await launchImageLibrary(options);
    if (image.didCancel) {
      console.log('User cancelled image picker');
    } else if (image.errorCode) {
      console.log('ImagePicker Error: ', image.errorMessage);
    } else {
      setUploading(true);
      const formdata = new FormData();
      formdata.append('file', {
        uri: image.assets[0].uri,
        type: image.assets[0].type,
        name: image.assets[0].fileName,
      });

      try {
        let res = await fetch('https://demo.sitegenio.in/api/v1/user/profile', {
          method: 'PATCH',
          body: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth-token': storage.getString('AUTH_TOKEN'),
            'access-token': storage.getString('ACCESS_TOKEN'),
            'fa-header':
              '99a0d160c86894ca7cf6d8bcb5e7095269308613f317e90bdfb12e39a62h6t5b',
          },
        });
        if (res.ok) {
          let responseJson = await res.json();
          UserAPI.util.invalidateTags(['USER']);
          dispatch(setuser(responseJson.data));
          showToast({
            type: 'success',
            heading: 'Image Uploaded',
            subheading: 'Image uploaded Successfully',
          });
          console.log('responsejson', responseJson);
        } else {
          new Error('Response not OK');
        }
      } catch (error) {
        console.error('error', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <ScrollView>
      {/* <Header /> */}
      <ImageUpdate
        avatar={user?.avatar}
        PicImage={PicImage}
        uploading={uploading}
      />
      <TextInput
        mode="outlined"
        value={user?.uid}
        label={'User Id '}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 25,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        value={name}
        onChangeText={setName}
        label={'Name'}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        label={'Mobile'}
        value={user?.mobile?.toString()}
        keyboardType="phone-pad"
        dataDetectorTypes={'phoneNumber'}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        label={'PAN No.'}
        value={pan.toString()}
        onChangeText={setPan}
        keyboardType="phone-pad"
        dataDetectorTypes={'phoneNumber'}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        label={'UPI Id'}
        value={upi.toString()}
        onChangeText={setupi}
        keyboardType="phone-pad"
        dataDetectorTypes={'phoneNumber'}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        label={'IFSC Code'}
        value={ifsc.toString()}
        onChangeText={setIfsc}
        keyboardType="phone-pad"
        dataDetectorTypes={'phoneNumber'}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <TextInput
        mode="outlined"
        label={'Account No.'}
        value={account.toString()}
        onChangeText={setAccount}
        keyboardType="phone-pad"
        dataDetectorTypes={'phoneNumber'}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />

      {/* <RadioButton.Group
      // onValueChange={newValue => setValue(newValue)}
      // value={value}
      >
        <View className="flex-row justify-around">
          <View className="flex-row items-center">
            <RadioButton value="first" />
            <Text className="font-WorksansMedium text-lg text-black">Male</Text>
          </View>
          <View className="flex-row items-center">
            <RadioButton value="first" />
            <Text className="font-WorksansMedium text-lg text-black">
              Female
            </Text>
          </View>
          <View className="flex-row items-center">
            <RadioButton value="first" />
            <Text className="font-WorksansMedium text-lg text-black">
              Others
            </Text>
          </View>
        </View>
      </RadioButton.Group> */}

      <ButtonFull
        title={'Update Profile'}
        onPress={UserUpdate}
        buttonStyle={'bg-black mb-20 mt-10'}
        textStyle={'text-white'}
      />
    </ScrollView>
  );
};

export default Profile;

const Header = () => {
  return (
    <View className="bg-black h-16 items-center flex-row justify-center">
      <Text className="text-white font-WorksansMedium text-xl text-center">
        My Profile
      </Text>
      <View />
    </View>
  );
};

const ImageUpdate = ({avatar, PicImage, uploading}) => {
  return (
    <View className="w-40 h-40 rounded-full self-center mt-5 bg-neutral-300 justify-center items-center">
      {uploading ? (
        <ActivityIndicator size={'small'} color={'#000'} />
      ) : (
        <Image source={{uri: avatar}} className="h-full w-full rounded-full" />
      )}
      <Pressable
        onPress={PicImage}
        className="absolute bottom-0 right-0 bg-white p-2 rounded-full">
        <Icon name="camera" size={34} color={'#000'} />
      </Pressable>
    </View>
  );
};
