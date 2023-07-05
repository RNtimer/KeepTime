import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
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
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KEEPTIME</Text>
      
      <ScrollView>
        {/* 위에 언제 다시 울리는지 */}
        <LinearGradient 
        end={{ x: 0.9, y: 0.8 }} 
        start={{ x: 0.2, y: 0.1 }} 
        colors={['rgba(255,53,126,1)', 
                'rgba(255,96,46,1)']} 
        style={styles.lefttime}
        >
          <Text style={styles.leftText}>다음 알림은{'\n'}4시간 36분후에 울림</Text>
        </LinearGradient>
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
        <View style={styles.clear}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  clear:{
    height:40,
  },
  title:{
    marginTop:30,
    marginLeft:15,
    fontSize:20,
    fontWeight:600,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex:1
  },
  lefttime: {
    flexDirection: "row",
    margin: 15,
    backgroundColor:"red",
    paddingTop: 35,
    paddingLeft: 20,
    paddingBottom: 40,
    borderRadius:30,
  },
  leftText: {
    fontSize:26,
    fontWeight:600,
    color:"white",
  },
  timer: {
    margin: 15,
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






