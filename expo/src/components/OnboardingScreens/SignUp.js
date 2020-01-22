// @flow

import * as React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  launchImageLibraryAsync,
  launchCameraAsync,
  MediaTypeOptions,
  requestCameraRollPermissionsAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { handleBrightIdCreation, fakeUserAvatar } from './actions';
import { mimeFromUri } from '../../utils/images';
import ResizeImage from '../../utils/ResizeImage';

type State = {
  name: string,
  initialPhoto: { uri: string },
  finalBase64: { uri: string },
  creatingBrightId: boolean,
};

export class SignUp extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'BrightID',
    headerBackTitle: 'SignUp',
    headerStyle: { backgroundColor: '#f48b1e' },
    headerRight: () => (
      <TouchableOpacity style={{ marginRight: 11 }}>
        <Ionicons name="ios-help-circle-outline" size={32} color="#fff" />
      </TouchableOpacity>
    ),
  };

  state = {
    name: '',
    initialPhoto: { uri: '' },
    finalBase64: { uri: '' },
    creatingBrightId: false,
  };

  randomAvatar = async (): Promise<void> => {
    try {
      const randomImage: string = await fakeUserAvatar();
      const initialPhoto = {
        uri: `data:image/jpeg;base64,${randomImage}`,
      };
      this.setState({ initialPhoto });
    } catch (err) {
      err instanceof Error ? console.warn(err.message) : console.log(err);
    }
  };

  choosePhotoFromLibrary = async () => {
    const { status } = await requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert(
        'Please update camera roll permissions to select a profile photo',
      );
    }
    const options = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
      mediaTypes: MediaTypeOptions.Images,
    };

    const res = await launchImageLibraryAsync(options);
    if (res.cancelled) {
      console.log('cancelled');
    } else {
      const initialPhoto = { uri: res.uri };
      this.setState({ initialPhoto });
    }
  };

  takePhoto = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return Alert.alert(
        'Please update camera permissions to take a profile photo',
      );
    }

    const options = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
      mediaTypes: MediaTypeOptions.Images,
    };

    const res = await launchCameraAsync(options);
    if (res.cancelled) {
      console.log('cancelled');
    } else {
      const initialPhoto = { uri: res.uri };
      this.setState({ initialPhoto });
    }
  };

  resetPhoto = () => {
    this.setState({
      initialPhoto: { uri: '' },
      finalBase64: { uri: '' },
    });
  };

  createBrightID = async () => {
    try {
      const { finalBase64, name } = this.state;
      const { navigation, dispatch } = this.props;
      this.setState({ creatingBrightId: true });
      if (!name) {
        this.setState({ creatingBrightId: false });
        return Alert.alert('BrightID Form Incomplete', 'Please add your name');
      }
      if (!finalBase64.uri) {
        this.setState({ creatingBrightId: false });
        return Alert.alert('BrightID Form Incomplete', 'A photo is required');
      }
      const result = await dispatch(
        handleBrightIdCreation({
          base64Photo: finalBase64,
          name,
        }),
      );
      navigation.navigate('App');
    } catch (err) {
      err instanceof Error ? console.warn(err.message) : console.log(err);
      this.setState({ creatingBrightId: false });
    }
  };

  onCapture = (uri: string) => {
    this.setState({ finalBase64: { uri } });
  };

  render() {
    const { name, initialPhoto, finalBase64 } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar
          barStyle="default"
          backgroundColor={Platform.OS === 'ios' ? 'transparent' : '#000'}
          translucent={false}
        />
        <ResizeImage
          width={180}
          height={180}
          onCapture={this.onCapture}
          uri={initialPhoto.uri}
        />
        <View style={styles.addPhotoContainer}>
          {finalBase64.uri ? (
            <TouchableOpacity
              onPress={this.resetPhoto}
              accessible={true}
              accessibilityLabel="edit photo"
            >
              <Image style={styles.photo} source={finalBase64} />
            </TouchableOpacity>
          ) : (
            <View style={styles.choosePhotoButtonContainer}>
              <TouchableOpacity
                onPress={this.takePhoto}
                style={styles.choosePhotoButton}
              >
                <Text style={styles.choosePhotoButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.choosePhotoFromLibrary}
                style={styles.choosePhotoButton}
              >
                <Text style={styles.choosePhotoButtonText}>
                  Choose from Library
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.midText}>What do your friends know you by?</Text>
          <TextInput
            onChangeText={(name) =>
              this.setState({
                name,
              })
            }
            value={name}
            placeholder="Name"
            placeholderTextColor="#9e9e9e"
            style={styles.textInput}
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="name"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonInfoText}>
            Your name and photo will never be shared with apps or stored on
            servers
          </Text>
          {!this.state.creatingBrightId ? (
            <View>
              <TouchableOpacity
                style={styles.createBrightIdButton}
                onPress={this.createBrightID}
              >
                <Text style={styles.buttonInnerText}>Create My BrightID</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('RecoveryCode')}
                style={styles.button}
                accessibilityLabel="Recover BrightID"
              >
                <Text style={styles.buttonText}>Recover BrightID</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loader}>
              <Text>Creating Bright ID...</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  addPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 44,
  },
  textInputContainer: {
    marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 44,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  photo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  midText: {
    fontFamily: 'ApexNew-Book',
    fontSize: 18,
  },
  textInput: {
    fontFamily: 'ApexNew-Light',
    fontSize: 36,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#9e9e9e',
    marginTop: 22,
    width: 275,
    textAlign: 'center',
    paddingBottom: 5,
  },
  buttonInfoText: {
    fontFamily: 'ApexNew-Book',
    color: '#9e9e9e',
    fontSize: 14,
    width: 298,
    textAlign: 'center',
  },
  createBrightIdButton: {
    backgroundColor: '#428BE5',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
    marginTop: 22,
  },
  buttonInnerText: {
    fontFamily: 'ApexNew-Medium',
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  button: {
    width: 300,
    borderWidth: 1,
    borderColor: '#4990e2',
    paddingTop: 13,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'ApexNew-Medium',
    color: '#4990e2',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  choosePhotoButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePhotoButton: {
    backgroundColor: '#428BE5',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 9,
    marginTop: 12,
  },
  choosePhotoButtonText: {
    fontFamily: 'ApexNew-Medium',
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  profilePhotoTitle: {},
});

export default connect()(SignUp);
