import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Switch,
  Dimensions, 
  KeyboardAvoidingView ,
} from "react-native";
export default function Edit({ navigation }) {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [alarmName, setAlarmName] = useState("")
  const onChangeHour = (payload) => setHour(payload);
  const onChangeMinute = (payload) => setMinute(payload);
  const onChangeAlarmName = (payload) => setAlarmName(payload);
  
  const [weekIndexinfo, setWeekIndexinfo] = useState(
    [0, 1, 2, 3, 4, 5, 6]
  );
  const [weekNameinfo, setWeekNameinfo] = useState(
    ['월', '화', '수', '목', '금', '토', '일']
  );
  const [weekinfo, setWeekinfo] = useState(
    [false, false, false, false, false, false, false]
  );
  const [isAM, setAM] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const [isEnabledVibe, setIsEnabledVibe] = useState(false);
  const toggleSwitch1 = () => setIsEnabledVibe(previousState => !previousState);
  const [isEnabledSound, setIsEnabledSound] = useState(false);
  const toggleSwitch2 = () => setIsEnabledSound(previousState => !previousState);
  const [isEnabledRe, setIsEnabledRe] = useState(false);
  const toggleSwitch3= () => setIsEnabledRe(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{color:"orange"}}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.addAlarm}>알람 추가</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Main", {
            alarmName,    
            hour,
                minute,
                isAM,
                weekinfo,
          })
        }}>
          <Text style={{color:"orange"}}>저장</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.setTime}>
        <Text style={styles.hopeTime}>희망 도착 시간</Text>
        <View style={[styles.setRow, {left:9}]}>
          <TouchableOpacity style={styles.selectAMPM}
                onPress={() => 
                  setAM(!isAM)
                
            }>
            <Text style={{
              color: isAM ? 'orange' : 'darkgray',
            }}>오전</Text>
            <Text style={{
              color: !isAM ? 'orange' : 'darkgray',
            }}>오후</Text>
          </TouchableOpacity>
          <TextInput 
            style={[styles.clock]}
            onChangeText={onChangeHour}
            keyboardType='numeric'
            value={hour}
            // onChangeText={(text)=> this.onChanged(text)}
            placeholder='00'
            maxLength={2}  //setting limit of input
          />
          <Text style={[styles.clock]}>:</Text>
          <TextInput 
            style={[styles.clock]}
            onChangeText={onChangeMinute}
            keyboardType='numeric'
            value={minute}
            // onChangeText={(text)=> this.onChanged(text)}
            placeholder='00'
            maxLength={2}  //setting limit of input
          />
        </View>
        <View style={[styles.setRow, styles.week, {left:-9}]}>
          {weekIndexinfo.map((index) => {
            return (
                <TouchableOpacity onPress={() => {
                    newarr =  [...weekinfo]
                    newarr[index] = !newarr[index]
                    setWeekinfo(newarr)
                }}>
                  <Text style={[styles.day, { color : weekinfo[index] ? "orange" : "black"}]}>{weekNameinfo[index]}</Text>
                </TouchableOpacity>
              )
          })}
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.options}>
      <TextInput
          onChangeText={onChangeAlarmName}
          value={alarmName}
          placeholder={
            "알람 이름"
          }
          style={[styles.input, styles.eachOption, styles.optionText]}
        />
        <View style={styles.line}></View>
        <View style={[styles.setRow, styles.setSpaceBetween, styles.eachTextOption]}>
          <Text style={styles.optionText}>도착 장소</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            <Text>아이리스 피시방</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.setRow, styles.setSpaceBetween, styles.eachOption]}>
          <Text style={styles.optionText}>진동</Text>
          <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabledVibe ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch1}
              value={isEnabledVibe}
              style={styles.switch}
          />
        </View>
        
        <View style={[styles.setRow, styles.setSpaceBetween]}>
          <Text style={styles.optionText}>알람 소리</Text>
          <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabledSound ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch2}
              value={isEnabledSound}
              style={styles.switch}
          />
        </View>
        <View style={[styles.setRow, styles.setSpaceBetween]}>
          <Text style={styles.optionText}>다시 울림</Text>
          <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabledRe ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch3}
              value={isEnabledRe}
              style={styles.switch}
          />
        </View>
        <View style={[styles.setRow, styles.setSpaceBetween, styles.eachTextOption]}>
          <Text style={styles.optionText}>준비 시간</Text>
          {/* <TextInput
            autoFocus 
            keyboardType="numeric"
            placeholder="5"
            style={[styles.minuteInput, , styles.optionText]}
          /> */}
          <TextInput 
            style={[styles.minuteInput, , styles.optionText]}
            
            keyboardType='numeric'
            // onChangeText={(text)=> this.onChanged(text)}
            placeholder='30'
            maxLength={2}  //setting limit of input
          />
        <Text style={styles.optionText}>분</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minuteInput:{
    right:-90
  },
  day:{
    marginLeft:10,  
  },
  line:{
    marginTop:8,
    backgroundColor:'black',
    width:320,
    height:0.3,
  },
  optionSubText:{
    color:'darkgray'
  },
  optionText:{
    fontSize:18,
    fontWeight:'300',
  },
  eachOption:{
    marginTop:20,
  },
  eachTextOption:{
    marginTop:23,
  },
  selectAMPM:{
    top:20,
    marginRight:20,
    left:-40,
    position:"absolute",
  },
  clock:{
    fontSize:60,
    fontWeight:'700',
    marginRight:20
  },
  setSpaceBetween:{
    justifyContent: "space-between",
  },
  setRow:{
    flexDirection: "row",
  },
  container: {
    flex:1,
  },
  topbar: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
    paddingTop: 45,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 45,
  },
  addAlarm:{
    fontSize:25,
    top:-9,
  },
  leftText: {
    fontSize:26,
    fontWeight:'600',
    color:"white",
  },
  timer: {
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 45,
    borderRadius:25,
    elevation: 7,
  },
  rowView1: {
    flexDirection: "row",
    marginBottom:5,
  },
  rowView2: {
    flexDirection: "row",
  },
  
  alarmName:{
    fontSize:13,
  },
  arrive:{
    bottom:-7,
    marginLeft:2,
    fontSize:8,
    marginBottom:7,
  },
  ampm:{
    bottom:-30,
    fontSize:13,
    marginRight:2,
  },
  time:{
    fontWeight:'600',
    letterSpacing:-2,
    fontSize:40,
  },
  switch:{
    bottom:-5,
  },
  hopeTime:{
    fontWeight:"700",
  },
  setTime:{
    alignItems: "center",
    // marginBottom:50,
  },
  week:{
    marginTop:40,
  },
  options:{
    padding:30,
  },
});