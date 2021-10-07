import React from 'react';
import {Text,View,Image,StyleSheet, TouchableOpacity, FlatList,ScrollView,ImageBackground, TouchableOpacityBase} from 'react-native';
import {onAuthStateChanged,getAuth,signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import { color } from 'react-native-elements/dist/helpers';



const Home=()=>{
    const tabs = ['Thẻ sinh viên |','Thẻ nhân viên |','Thẻ xe bus']
    const [selectedTab,setSelectedTab] = React.useState(tabs[0])
    return(
        <View style={{ flex: 1,backgroundColor:'#17222F'}}>
        <ImageBackground source={require('./images/bg4.png')} resizeMode="cover" style={styles.ImageBackground}>
        <ScrollView >
            
            
            <View >
                <View style={styles.profileView}>
                    <View style={styles.welcome}>
                        <Text style={styles.xinchao}>Xin chào !!!</Text>
                        <Text style={styles.name}>Nguyễn Lê Thanh Điệp</Text>
                    </View>
                    
                    <View style={styles.profileImageView}>
                        <Image
                            style={styles.profileImage}
                            source={
                            require('./images/user.png')
                            }/>
                     </View>
                </View>
                <View  style={styles.buttonGroup}>
                    
                    <TouchableOpacity style={styles.button}>
                        <Image
                            style={styles.button}
                            source={
                            require('./images/button1.png')
                            }/>
                        <Text style={styles.textbutton}>Quét QR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image
                            style={styles.button}
                            source={
                            require('./images/button2.png')
                            }/>
                        <Text style={styles.textbutton}>Tạo QR</Text>
                    </TouchableOpacity>         
                    <TouchableOpacity style={styles.button}>
                            <Image
                            style={styles.button}
                            source={
                            require('./images/button3.png')
                            }/>
                        <Text style={styles.textbutton}>Ưu đãi</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.button}>
                            <Image
                            style={styles.button}
                            source={
                            require('./images/button4.png')
                            }/>
                        <Text style={styles.textbutton}>Ví của tôi</Text>
                    </TouchableOpacity> 

                </View>
            </View>
            
            <View style={styles.slider}>
                    <Image
                        style={styles.the}
                        source={
                            require('./images/bannershopee.png')
                        }
                        />
             </View>
            <View>
                <Text style={styles.title}>Mua sắm tích điểm:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandImageView}>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/tiki.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/shopee.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/lazada.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/sendo.png')
                        }
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/pnj.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/concung.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/bitis.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/fado.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/anhkhue.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/xwatch.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/fahasa.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/adidas.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/nike.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/hnam.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/hoangha.png')
                        }
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View>
                <View>
                
                    <Text style={styles.title}>Thương hiệu thân quen:</Text>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandImageView}>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/otoke.jpg')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/toco.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/jolibee.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/kfc.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/lotte.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/3rau.png')
                        }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                        style={styles.brandImage}
                        source={
                            require('./images/nhanhieu/yame.png')
                        }
                        />
                    </TouchableOpacity>
                </ScrollView>
            </View>
                       
            </ScrollView>
            </ImageBackground> 
        </View>
    )
}


const styles = StyleSheet.create({
    ImageBackground:{
    flex: 1,
    justifyContent: "center"
    },
    container: {
        backgroundColor:'#4b9acb'
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
        width: 70,
        height: 70,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#fff',
    },
    profileView :{
        marginTop: 40 , 
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    welcome: {
        marginLeft: 20,
    },
    xinchao: {
        fontWeight: "bold",
        fontSize: 22,
        color : '#FFFFFF',
        
    },
    name: {
        fontSize: 17,
        color : '#FFFFFF',

    },
    button: {
        borderRadius: 15,
        width:60,
        height: 80,
        flex: 1,
        alignItems: 'center'
    },
    buttonGroup: {
        padding:7,
        borderRadius:10,
        backgroundColor: '#2C3C4980',
        marginTop:20,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight:20,
        
    },
    tab1: {
        margin:20,
        height:45,
        borderRadius:20,
        backgroundColor: '#3B40C4'
    },
    tab2:{
        margin:5,
        height:35,
        borderRadius:15,
        backgroundColor: '#292C87'
    },
    tab3: {
        width:80,
        height:35,
        borderRadius:15,
        backgroundColor: '#6AD4FB'
    },
    tabitem:{
        fontWeight: "bold",
        fontSize: 14,
        color : '#fff',
        textAlign:'center'
    },
    brandImageView: {
        flexDirection: 'row',
        margin:10,
        backgroundColor: '#2C3C4980',
        padding: 5,
        borderRadius:10,
        shadowColor: '#586577',
        
    },
    brandImage: {
        margin:5,
        width: 60,
        height: 60,
        borderRadius: 100,

        
    },
    title: {
        fontWeight: "bold",
        marginLeft:20,
        color:'#FFFFFF',
        fontSize: 18,
    },
    the : {
        width:350,
        height:250,
        resizeMode: 'contain'
    },
    slider:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop:-20
    },
    textbutton:{
        color:'#FFFFFF'
    }
})
export default Home;