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
      <View style={styles.titleView}>
        <Text style={styles.title}>KEEPTIME</Text>
      {/* 위에 언제 다시 울리는지 */}
      </View>
      <View style={styles.lefttime}>
        <Text style={styles.leftText}>다음 알림은{'\n'}4시간 36분후에 울림</Text>
      </View>
      <ScrollView>
        <View style={styles.timer}>
          {/* 알람 이름, 위치 */}
          <View style={styles.rowView1}>
            <Text style={styles.alarmName}>알람 이름</Text>
            <Text style={styles.arrive}>도착 장소</Text>
          </View>
          {/* 오전, 시간, 요일, 온오프 */}
          <View style={styles.rowView2}>
            <Text style={styles.ampm}>오전</Text>
            <Text style={styles.time}>06 : 50</Text>
            <Text style={styles.week}>일 월 화 수 목 금 토</Text>
            <Switch
              trackColor={{false: '#767577', true: '#FF90AB'}}
              thumbColor={isEnabled ? '#ff3e6d' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
          </View>
        </View>
        <View style={styles.timer}>
          {/* 알람 이름, 위치 */}
          <View style={styles.rowView1}>
            <Text style={styles.alarmName}>알람 이름</Text>
            <Text style={styles.arrive}>도착 장소</Text>
          </View>
          {/* 오전, 시간, 요일, 온오프 */}
          <View style={styles.rowView2}>
            <Text style={styles.ampm}>오전</Text>
            <Text style={styles.time}>06 : 50</Text>
            <Text style={styles.week}>일 월 화 수 목 금 토</Text>
            <Switch
              trackColor={{false: '#767577', true: '#FF90AB'}}
              thumbColor={isEnabled ? '#ff3e6d' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
          </View>
        </View>
        <View style={styles.timer}>
          {/* 알람 이름, 위치 */}
          <View style={styles.rowView1}>
            <Text style={styles.alarmName}>알람 이름</Text>
            <Text style={styles.arrive}>도착 장소</Text>
          </View>
          {/* 오전, 시간, 요일, 온오프 */}
          <View style={styles.rowView2}>
            <Text style={styles.ampm}>오전</Text>
            <Text style={styles.time}>06 : 50</Text>
            <Text style={styles.week}>일 월 화 수 목 금 토</Text>
            <Switch
              trackColor={{false: '#767577', true: '#FF90AB'}}
              thumbColor={isEnabled ? '#ff3e6d' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
          </View>
        </View>
        <View style={styles.timer}>
          {/* 알람 이름, 위치 */}
          <View style={styles.rowView1}>
            <Text style={styles.alarmName}>알람 이름</Text>
            <Text style={styles.arrive}>도착 장소</Text>
          </View>
          {/* 오전, 시간, 요일, 온오프 */}
          <View style={styles.rowView2}>
            <Text style={styles.ampm}>오전</Text>
            <Text style={styles.time}>06 : 50</Text>
            <Text style={styles.week}>일 월 화 수 목 금 토</Text>
            <Switch
              trackColor={{false: '#767577', true: '#FF90AB'}}
              thumbColor={isEnabled ? '#ff3e6d' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
          />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  clear:{
    height:40,
  },
  titleView:{
    justifyContent: "center",
    alignItems: "center",
    marginBottom:7
  },
  title:{
    fontSize:20,
    fontWeight:600,
    
  },
  container: {
    margin:20,
    flex:1
  },
  lefttime: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 15,
    backgroundColor:"red",
    paddingTop: 45,
    paddingLeft: 20,
    paddingBottom: 45,
    borderRadius:30,
  },
  leftText: {
    fontSize:26,
    fontWeight:600,
    color:"white",
  },
  timer: {
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: -20,
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
  }
});






