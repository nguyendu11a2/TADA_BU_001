import React , { useEffect ,useState }from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import Register from './Register';
import { Icon } from 'react-native-elements';
import FormError from '../Screens/FormError';
import firebase from "firebase/app";
import  firebaseDCLV  from './firebase';
import {onAuthStateChanged,getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import FormSuccess from '../Screens/FormSuccess';
const Login = ({navigation})=>{
  useEffect(() => {
      StatusBar.setBackgroundColor('transparent')
      StatusBar.setTranslucent(true)
  }, []);
  function navigate(){
      navigation.navigate('register')
  }
  const auth = getAuth();
  const [email,setEmail] = useState(''); 
  const [password,setPassword] = useState();
  const [errMessage,setErrorMessage]= useState('');
  const [displayFormErr,setDisplayFormErr] = useState(false);
  const [isLoading,setIsLoading]= useState(false);
 const ValidateInput =()=>{
    var form_inputs = [email,password];
    if(form_inputs.includes('') || form_inputs.includes(undefined)) {
      setErrorMessage("Vui lòng điền đầy đủ \n thông tin !!!");
      return setDisplayFormErr(true); 
    }
    setIsLoading(true)
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        setIsLoading(false)
        

    })
    .catch((err) => {
      setErrorMessage(err.message)
      return setDisplayFormErr(true)
    });
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={require('./ic_launcher.png')} />
            </View>
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={'none'}
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={(val)=>setEmail(val)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={'none'}
                secureTextEntry={true}
                textContentType='password'
                value={password}
                onChangeText={(val)=>setPassword(val)}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={ValidateInput}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.registerText} onPress={navigate}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {displayFormErr == true?
          <FormError hideErrOverlay={setDisplayFormErr} err={errMessage}/>
          :null
        }

        {isLoading == true?
          <FormSuccess/>
          :
          null

        }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#2596be',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#4bbedb',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#4bccdb',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});

export default Login;