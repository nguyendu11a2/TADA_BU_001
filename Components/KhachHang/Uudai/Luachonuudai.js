import React, {useState, useEffect} from 'react';
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
import {getDatabase, ref, onValue, set, update,get} from 'firebase/database';
import firestore from '@react-native-firebase/firestore';
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Uudaicuatoi = () => {
  
  
const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
   getdata()
  }, []);
const db = getDatabase();
function getdata(){

    const starCountRef = ref(db, 'magiamgia/');
    
    onValue(starCountRef, snapshot => {
      let array = [];
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        array.push({
          magiamgia: childSnapshot.key,
          giatridonhangtoithieu: childData.giatridonhangtoithieu,
          giatrigiam: childData.giatrigiam,
          tenchuongtrinh: childData.tenchuongtrinh,
          thoigianbatdau: childData.thoigianbatdau,
          linkanh: childData.linkanh,
          soDiemCanDoi: childData.soDiemCanDoi,
          anhdaidiencuahang: childData.anhdaidiencuahang,
          slsudungconlai: childData.soluongsudungconlai,
        });
        

      });
      setData(array);
    });
}

   const btnRestart = () => {
    RNRestart.Restart();
  };

   const [uudaitontai, setUudaitontai] = useState(null); 
const checkuudai = async (mgg) => {
   await onValue(
      ref(db, 'basicUser/4545454545/uudaicuatoi/' + mgg),
      recall => {
        if (recall.val()!== null){
          setUudaitontai(false)
        }else{
          setUudaitontai(true)
        }

      },
    );
  }

 async function checksoluong(id_magiamgia) {
    onValue(ref(db, 'magiamgia/' + id_magiamgia), snapshot => {
console.log(snapshot.val().soluongsudungconlai>0)
      if (snapshot.val().soluongsudungconlai > 0) {
          return true;
        } else {
          return false;
        }
    });
  }

async  function layma(id_magiamgia) {
  await checkuudai(id_magiamgia);
   console.log(uudaitontai)
    if (uudaitontai) {

      update(ref(db, 'basicUser/4545454545/uudaicuatoi/' + id_magiamgia), {
        ngaythuthap: new Date(),
      })
        .then(() => {
          update(ref(db, 'magiamgia/' + id_magiamgia), {
            soluongsudungconlai: 10,
          });
          firestore().collection('magiamgia').doc(id_magiamgia).collection('lichsuthuthap').add({
                    ngaythuthap: "ffffff"
          })
          console.log('Thêm thành công');
        })
        .catch(err => {
          console.log('ddddd');
        });
    }else{

      console.log('Có rồi');
    }
  }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('./images/bg4.png')}
        resizeMode="cover"
        style={styles.ImageBackground}>
        <View>
          <TouchableOpacity onPress={() => Uudaicuatoi}>
            <Image style={styles.btn} source={require('./images/back.png')} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#FFFFFF',
                  marginTop: '-10%',
                  fontSize: 25,
                  fontFamily: 'BalooBhaina2-ExtraBold',
                }}>
                Ưu đãi
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fffffF',
            height: '100%',
            width: '100%',
            marginTop: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flexDirection: 'column',
            alignContent: 'center',
          }}>
          <View style={{ marginTop: 10, height: '79%'}}>
            <FlatList
            refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
              data={data}
              extraData={data}
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
                    marginTop: 20,
                    marginBottom:20
                  }}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image
                      style={{
                        width: '100%',
                        height: 120,
                        borderRadius: 10,
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                      source={{uri: item.linkanh}}
                    />
                  </View>

                  <View style={{flexDirection: 'row', marginTop: -30}}>
                    <Image
                      style={styles.profileImage}
                      source={{uri: item.anhdaidiencuahang}}
                    />

                    <View style={{flexDirection: 'column', flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            layma(item.magiamgia)
                          }}>
                          <View
                            style={{
                              backgroundColor: '#FFC93D',

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
                              {item.soDiemCanDoi} điểm
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
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
                            marginTop: -5,
                            fontFamily: 'BalooBhaina2-Regular',
                          }}>
                          Hiệu lực từ: {item.thoigianbatdau}{' '}
                        </Text>
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
  ImageBackground: {},
  container: {
    backgroundColor: '#4b9acb',
  },

  profileImageView: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 20,
    marginTop: 10,
    borderRadius: 100,
    borderWidth: 1,
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
    width: 40,
    height: 40,

    alignItems: 'center',
  },
});
export default Uudaicuatoi;
