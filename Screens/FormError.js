import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image, Touchable} from 'react-native';
import {Overlay} from 'react-native-elements';
const FormError = (props)=>{
    return(
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideErrOverlay(false)}>
                <Image
                style={styles.errorIcon}
                source={require('./cancel.png')}
                />
                <Text style={styles.errorMessage}>
                    {props.err}
                </Text>
                <TouchableOpacity style={styles.Button} onPress={()=>props.hideErrOverlay(false)}>
                    <Text style={styles.ButtonText}>ĐỒNG Ý</Text>
                </TouchableOpacity>
        </Overlay>
    )
}
export default FormError;
const styles = StyleSheet.create({
    Overlay:{
        width:'90%',
        height:300,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    errorIcon:{
        width:72,
        height:72,
    },
    errorMessage:{
        margin: 20,
        fontSize: 20,
        textAlign: 'center',
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