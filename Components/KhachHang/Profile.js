import React, {useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {onAuthStateChanged,getAuth,signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import { getDatabase, ref, onValue} from "firebase/database";
import  firebaseDCLV  from '../firebase';


export default function Profile() {
  useEffect(() => {
      StatusBar.setBackgroundColor('transparent')
      StatusBar.setTranslucent(true)
  }, []);
    const auth = getAuth();
    console.log(auth.currentUser.displayName)
    const logOut = () =>{
        
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }
    const read_data=()=>{
        const db = getDatabase();
        const starCountRef = ref(db, 'users');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot;
        if(data){console.log(data)}
        
        });
        
        
    }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={require('./images/bg016.png')}
            />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={
                    require('./images/user.png')
                  }
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{auth.currentUser.displayName}</Text>
                <Text style={styles.userBio}>{auth.currentUser.email}</Text>
              </View>
              {/* Posts/Followers/Following View */}
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>13</Text>
                  <Text style={styles.countText}>Mã giảm giá</Text>
                </View>
                
                <View style={styles.countView}>
                  <Text style={styles.countNum}>348</Text>
                  <Text style={styles.countText}>Điểm</Text>
                </View>
              </View>
              {/* Interact Buttons View */}
              
            </View>
            
            

            <View style={styles.setting}>
              <View style={styles.hr}></View>
                <View>
                    <Text style={styles.title}>TÀI KHOẢN</Text>
                </View>
                <View style={styles.item}> 
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/stick-man.png')
                          }
                        />
                      <Text style={styles.itemtext}>Quản tài khoản</Text>
                </View>
                <View style={styles.item}>  
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/history.png')
                          }
                        />
                      <Text style={styles.itemtext}>Lịch sử tích điểm</Text>
                </View>
                <View style={styles.item}>  
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/shield.png')
                          }
                        />
                      <Text style={styles.itemtext}>Bảo mật</Text>
                </View>
                <View style={styles.item}>  
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/add-user.png')
                          }
                        />
                      <Text style={styles.itemtext}>Mã giới thiệu</Text>
                </View>
                
                <View style={styles.hr}></View>
                <View>
                    <Text style={styles.title}>HỖ TRỢ</Text>
                </View>
                <View style={styles.item}> 
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/book.png')
                          }
                        />
                      <Text style={styles.itemtext}>Điều kiện & Điều khoản</Text>
                </View>
                <View style={styles.item}> 
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/chat.png')
                          }
                        />
                      <Text style={styles.itemtext}>Các câu hỏi thường gặp</Text>
                </View>
                <View style={styles.item}> 
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/phone-call.png')
                          }
                        />
                      <Text style={styles.itemtext}>Liên hệ với chúng tôi</Text>
                </View>
                <View style={styles.hr}></View>
                <View>
                
                    <Text style={styles.title}>CỘNG ĐỒNG</Text>
                </View>
                <View style={styles.item}>
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/facebook.png')
                          }
                        />
                      <Text style={styles.itemtext}>Fanpage: </Text>
                </View>
                <View style={styles.item}>
                      <Image
                          style={styles.iconitem}
                          source={
                            require('./images/youtube.png')
                          }
                        />
                      <Text style={styles.itemtext}>Youtube: </Text>
                </View>
            </View>
            <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: '#4b7bec',
                  }} onPress={read_data}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: '#4b7bec' }}
                  >
                  Logout
                  </Text>
                </TouchableOpacity>
              </View>
              
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 260, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 0 },
  userFullName: { fontSize: 25 },
  userBio: {

    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: {  fontSize: 20 },
  countText: {  fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {

    fontSize: 18,
  },
  item:{
    height: 40,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconitem:{
    width:16,
    height:16,
    marginLeft:10,
    paddingHorizontal: 8,
  },
  itemtext:{
    marginLeft:10,
    fontSize: 15,
  },
  setting:{
    marginTop:10,
    marginLeft:20,
  }
  ,
  hr: {
    marginLeft:10,
    width: '90%',
    height: 0.5,
    backgroundColor: '#858b94',
    marginTop: 6,
  },
  title:{
    color:'#858b94',
    marginTop: 6
  }
});