import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacityBase,
} from 'react-native';
import {
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {color} from 'react-native-elements/dist/helpers';
import SwitchSelector from 'react-native-switch-selector';
import {ListItem, Icon} from 'react-native-elements';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import firebaseDCLV from '../../firebase';
const Uudaicuatoi = () => {
  const auth = getAuth().currentUser;
const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [dataArray,setDataArray] = useState([]);
  
  firestore().collection('basicUsers').doc('KYL93HVdBuefM3kHu7wOGu1hony1').collection('testuudai').doc('qMGsI9mjdLwiMQSUawHo')
  .onSnapshot(documentSnapshot => {
        console.log(documentSnapshot.data())

  })

  useEffect(async () => {
    const  subscriber =  firestore()
      .collection('basicUsers')
      .doc(auth.uid)
      .onSnapshot(documentSnapshot => {
        if (!documentSnapshot.empty) {
          let array = Object.keys(documentSnapshot.data().uudaicuatoi);
          let newData = [];
          array.forEach(item =>{
    firestore()
      .collection('magiamgia')
      .doc(item)
      .onSnapshot(childData => {
        newData.push({
          tenchuongtrinh: childData.data().tenchuongtrinh,
          anhdaidiencuahang:childData.data().anhdaidiencuahang,
        });

      })
    }) 

    setDataArray(newData);
        }

        return () => subscriber();
      });
  }, [auth.uid]);

  

  const getMaOfUser = async () => {};


  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('./images/bg4.png')}
        resizeMode="cover"
        style={styles.ImageBackground}>
        
          <View>
            <TouchableOpacity>
              <Image style={styles.btn} source={require('./images/back.png')} />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    marginTop: '-10%',
                    fontSize: 20,
                    fontFamily: 'BalooBhaina2-ExtraBold',
                  }}>
                  Ưu đãi của tôi
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fffffF',
              height: 1000,
              marginTop: 10,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View
              elevation={2}
              style={{
                height: 45,
                backgroundColor: '#FFF',
                marginTop: 10,
                borderRadius: 50,
                fontFamily: 'BalooBhaina2-ExtraBold',
              }}>
              <SwitchSelector
                initial={0}
                buttonColor={'#00D1E4'}
                textColor={'#113D6B70'}
                fontSize={18}
                selectedColor={'#FFFFFF'}
                borderColor={'#FFFFFF'}
                borderWidth={1}
                height={45}
                hasPadding
                options={[
                  {label: 'Ưu đãi', value: 'f'},
                  {label: 'Hết hiệu lực', value: 'm'},
                ]}
                testID="gender-switch-selector"
                accessibilityLabel="gender-switch-selector"
                style={{width: '80%'}}
              />
            </View>

            <View>
          <FlatList
                      refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                        data={dataArray}
                        contentContainerStyle={{
                          flexGrow: 1,
                        }}
                        renderItem={({item, index}) => (
                          <View
                  elevation={1}
                  style={{
                    paddingBottom: 10,
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF',
                    marginLeft: 20,
                    marginRight: 20,
                    flexDirection: 'column',
                    justifyContent: 'center',

                    marginBottom:20
                  }}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                      style={{
                        width: '100%',
                        height: 50,
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                      
                    />
                  </View>

                  <View style={{flexDirection: 'row', marginTop: -30}}>
                    <Image
                      style={styles.profileImage}
                      source={{uri: item.anhdaidiencuahang}}
                    />

                    <View style={{flexDirection: 'column', flex: 1}}>
                      
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000000',

                            fontFamily: 'BalooBhaina2-Regular',
                          }}>
                          {item.tenchuongtrinh}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#8B8B8B',
                            fontFamily: 'BalooBhaina2-Regular',
                          }}>
                          Hiệu lực từ: 
                        </Text>
                      </View>
                    <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity
                          >
                          <View
                            style={{
                              backgroundColor: '#FFC93D',
                              height:30,
                              borderTopLeftRadius: 20,
                              borderBottomLeftRadius: 20,
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#000',
                                fontFamily: 'BalooBhaina2-Bold',
                                paddingLeft: 6,
                                paddingRight: 6,
                                paddingTop: 3,
                              }}>
                              Sử dụng
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
               )}
                      />

            </View>
            
          </View>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#4b9acb',
  },
  coverImage: {
    height: 160,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImageView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  profileImage: {
    width: 60,
    height: 60,
    margin: 10,

    borderWidth: 4,
    borderColor: '#fff',
  },
  profileView: {
    marginTop: 40,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcome: {
    marginLeft: 20,
  },
  xinchao: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
  name: {
    fontSize: 17,
    color: '#FFFFFF',
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#00D1E4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    padding: 7,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  tab1: {
    margin: 20,
    height: 45,
    borderRadius: 20,
    backgroundColor: '#3B40C4',
  },
  tab2: {
    margin: 5,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#292C87',
  },
  tab3: {
    width: 80,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#6AD4FB',
  },
  tabitem: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  brandImageView: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#2C3C4980',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#586577',
  },
  brandImage: {
    margin: 5,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#113D6B',
    fontSize: 18,
  },
  the: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
  },
  slider: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  textbutton: {
    color: '#FFFFFFFF',
    fontFamily: 'BalooBhaina2-Bold',
  },
  textqlch: {
    color: '#000000',
    fontSize: 11,
  },
  btn: {
    marginLeft: 10,
    marginTop: 40,
    borderRadius: 15,
    width: 50,
    height: 50,

    alignItems: 'center',
  },
});
export default Uudaicuatoi;
