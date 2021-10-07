import React, {useState} from 'react';
import {
  View,
  Button,
  Platform,
  Image,
  RadioGroup,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {getDatabase, ref, onValue, set} from 'firebase/database';
const ManageCoupon = () => {
  const [formattedDate, setFormattedDate] = useState(
    format(new Date(), 'dd/MM/yyyy H:mm'),
  );
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [select, setSelect] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const [tenChuongTrinhGiamGia, setTenChuongTrinhGiamGia] = useState('');
  const [giaTriGiam, setGiaTriGiam] = useState('');
  const [maGiamGia, setMaGiamGia] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
    setFormattedDate(format(tempDate, 'dd/MM/yyyy H:mm'));
  };
  function createCoupon() {
    const db = getDatabase();
    set(ref(db, 'users/"+"magiamgia/' + maGiamGia), {
      tenchuongtrinh: tenChuongTrinhGiamGia,
      giatrigiam: giaTriGiam,
      profile_picture: 'imageUrl',
    }).catch(error => {});
  }
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{marginTop: 60}}>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Tên chương trình giảm giá</Text>
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          onChangeText={val => setTenChuongTrinhGiamGia(val)}
        />
      </View>
      <Text style={styles.inputLabel}>Thời gian lưu hành mã:</Text>
      <View >
        <Text style={styles.inputLabel}>Từ: </Text>
        <TouchableOpacity
          style={{
            marginLeft: 25,
          }}
          onPress={showDatepicker}>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              width: 160,
              flexDirection: 'row',
              borderRadius: 5,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('./images/lich.png')}
            />
            <Text style={{marginLeft:10}}>{formattedDate}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.inputLabel}>Đến</Text>
        <TouchableOpacity
          style={{
            marginLeft: 25,
          }}
          onPress={showTimepicker}>
          <View
            style={{
              borderWidth: 1,
              padding: 6,
              width: 160,
              flexDirection: 'row',
              borderRadius: 5,
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('./images/lich.png')}
            />
            <Text style={{marginLeft:10}}>{formattedDate}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="spinner"
          textColor="red"
          minuteInterval={10}
          onChange={onChange}
        />
      )}
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Mã voucher</Text>
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          onChangeText={val => setMaGiamGia(val)}
        />
      </View>
      <Text style={styles.inputLabel}>Hình thức giảm giá</Text>
      <View style={styles.select}>
        <TouchableOpacity
          style={styles.select_btn}
          onPress={() => setSelect(!select)}>
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: select ? 'yellow' : 'white',
            }}
            source={require('../KhachHang/images/user.png')}
          />
          <Text style={{color: select ? 'yellow' : 'white'}}>
            Theo số tiền{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.select_btn}
          onPress={() => setSelect(!select)}>
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: select ? 'white' : 'yellow',
            }}
            source={require('../KhachHang/images/user.png')}
          />
          <Text style={{color: select ? 'white' : 'yellow'}}>
            Theo phần trăm
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          onChangeText={val => setGiaTriGiam(val)}
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Đơn hàng tối thiểu</Text>
        <TextInput style={styles.input} autoCapitalize={'none'} />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Số lượng phát hành</Text>
        <TextInput style={styles.input} autoCapitalize={'none'} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={createCoupon}>
        <Text style={styles.loginButtonText}>Tạo mã</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    marginTop: 20,
  },
  select_btn: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    width: '85%',
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
  inputLabel: {
    marginLeft: 15,
    marginTop: 10
  },
});
export default ManageCoupon;
