import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image, Touchable,ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
const FormSuccess = (props)=>{
    return(
        props.successMessage?
            <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.close('')}>
                    
                    <Image
                    style={styles.SuccessIcon}
                    source={require('./image/check.png')}
                    />
                    <Text style={styles.SuccessMessage}>
                        {props.successMessage}
                    </Text>
                    <TouchableOpacity style={styles.Button} onPress={()=>props.close('')}>
                        <Text style={styles.ButtonText}>ĐỒNG Ý</Text>
                    </TouchableOpacity>
            </Overlay>
        :
        <Overlay overlayStyle={styles.Overlay} isVisible={true}>
            <ActivityIndicator size="large" color="#00ff00" />
        </Overlay>
    )
}
export default FormSuccess;
const styles = StyleSheet.create({
    Overlay:{
        width:'90%',
        height:300,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    SuccessIcon:{
        width:72,
        height:72,
    },
    SuccessMessage:{
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    Button: {
    width:'90%',
    height:51,
    backgroundColor: '#4bccdb',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
    ButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
})