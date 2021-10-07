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


const Thanhtoan = () => {
const auth = getAuth().currentUser;
//Lấy lịch sử thu thập trong vòng 7 ngày của mã giảm giá nào đó
    function getLSThuThap() {
        var date = new Date().getTime()-605220000;
        firestore()
                .collection('magiamgia').doc('BITIS50K').collection('lichsuthuthap')
                .where('ngaythuthap', '>=', date)
                .get()
                .then((querySnapshot) => {
                    const tempDoc = []
      querySnapshot.forEach((doc) => {
         tempDoc.push({ id: doc.id, ...doc.data() })
      })
      console.log(tempDoc)
                });
    };
// Viết hóa dơn đã thanh tóan vào basicUser
    function taoHoaDonThanhToan() {
        try {
            firestore()
                .collection('basicUsers')
                .doc(auth.uid)
                .collection('hoadonthanhtoan')
                .add({
                    merchantnhanthanhtoan: 'KYL93HVdBuefM3kHu7wOGu1hony1',
                    ngaythanhtoan:new Date().getTime(),
                    sdtdhoadon:10,
                    sotienthanhtoan:500000,
                    mggapdung:"GIAMGIATEST",

                })
            firestore()
                .collection('basicUsers')
                .doc(auth.uid)
                .update({
                    sodiemtichduoc: firestore.FieldValue.increment(10),
                })
        } catch (err){

        }
        

    };





  return (
    <View style={{marginTop:60}}>
            <TouchableOpacity onPress={() => getLSThuThap(this)}>
                <Text>Lấy lịch sử 7 ngày</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => taoHoaDonThanhToan(this)} style={{marginTop:20}}>
                <Text>Thanh toán</Text>
            </TouchableOpacity>
    </View>
  );
};


export default Thanhtoan;
