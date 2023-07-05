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
} from "react-native";
export default function Main() {
  const screenWidth = Dimensions.get('window').width;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text>취소</Text>
        <Text style={styles.addAlarm}>알람 추가</Text>
        <Text>저장</Text>
      </View>
      <View style={styles.setTime}>
        <Text style={styles.hopeTime}>희망 도착 시간</Text>
        <View style={[styles.setRow]}>
          <View style={styles.selectAMPM}>
            <Text>오전</Text>
            <Text>오후</Text>
          </View>
          <Text style={styles.clock}>08 : 00</Text>
        </View>
        <Text style={styles.week}>일월화수목금토</Text>
        
      </View>
      <View style={styles.options}>
      <TextInput
          placeholder={
            "알람 이름"
          }
          style={[styles.input, styles.eachOption]}
        />
        <View style={[styles.setRow, styles.setSpaceBetween, styles.eachTextOption]}>
          <Text>도착 장소</Text>
          <Text>아이리스 피시방</Text>
        </View>
        <View style={[styles.setRow, styles.setSpaceBetween, styles.eachOption]}>
          <Text>진동</Text>
          <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
        </View>
        
        <View style={[styles.setRow, styles.setSpaceBetween]}>
          <Text>알람 소리</Text>
          <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
        </View>
        <View style={[styles.setRow, styles.setSpaceBetween]}>
          <Text>다시 울림</Text>
          <Switch
              trackColor={{false: '#767577', true: 'orange'}}
              thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eachOption:{
    marginTop:20,
  },
  eachTextOption:{
    marginTop:20,
  },
  selectAMPM:{
    top:20,
    marginRight:20,
    left:-40,
    position:"absolute",
  },
  clock:{
    fontSize:50,
    fontWeight:700,
    
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
    backgroundColor:"tomato",
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
    fontWeight:600,
    color:"white",
  },
  timer: {
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor:"white",
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
    fontWeight:600,
    letterSpacing:-2,
    fontSize:40,
  },
  week:{
    bottom:-25,
    fontSize:11,
    marginLeft:20,
  },  
  switch:{
    bottom:-5,
  },
  hopeTime:{
    
  },
  setTime:{
    alignItems: "center",
    backgroundColor:"cyan",
    // marginBottom:50,
  },
  week:{
    marginTop:50,
    letterSpacing:20,
    fontSize:16,
  },
  options:{
    padding:30,
    backgroundColor:'green',
  },
});






