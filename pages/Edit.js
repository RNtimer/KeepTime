import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
const STORAGE_KEY = "@timers"



const addToDo = async () => {
  if (text === "") {
    return;
  }
  const newToDos = {
    ...toDos,
    [Date.now()]: { text, working },
  };
  setToDos(newToDos);
  await saveToDos(newToDos);
  setText("");
};

export default function Edit({ navigation, route }) {
  const [timer, setTimer] = useState('')
  const [timers, setTimers] = useState({})
  
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [alarmName, setAlarmName] = useState("");
  const onChangeHour = (payload) => setHour(payload);
  const onChangeMinute = (payload) => setMinute(payload);
  const onChangeAlarmName = (payload) => setAlarmName(payload);
  const onChangeWaitTime = (payload) => setWaitTime(payload);

  const [weekIndexinfo, setWeekIndexinfo] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [weekNameinfo, setWeekNameinfo] = useState([
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
    "일",
  ]);
  const [weekinfo, setWeekinfo] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isAM, setAM] = useState(true);
  const screenWidth = Dimensions.get("window").width;
  const [isEnabledVibe, setIsEnabledVibe] = useState(false);
  const toggleSwitch1 = () =>
    setIsEnabledVibe((previousState) => !previousState);
  const [isEnabledSound, setIsEnabledSound] = useState(false);
  const toggleSwitch2 = () =>
    setIsEnabledSound((previousState) => !previousState);
  const [isEnabledRe, setIsEnabledRe] = useState(false);
  const toggleSwitch3 = () => setIsEnabledRe((previousState) => !previousState);
  const [waitTime, setWaitTime] = useState("");

  const saveTimer = async () => {
              if (route.params.isAdd){
                const value = await AsyncStorage.getItem("Timers").push([{alarmName}, {hour}, {minute}, {isAM}, {week}, {isEnabledVibe}, {isEnabledRe}, {isEnabledSound}, {"destination" : route.params.des}, {waitTime}])
              AsyncStorage.setItem(value)
              }
            }
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={{ color: "orange" }}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.addAlarm}>{route.params.isAdd ? "알람 추가" : "알람 수정"}</Text>
        <TouchableOpacity 
          onPress={() => {
            dur = route.params.duration
            isADD = route.params.isAdd
            navigation.navigate("Main", {
              alarmName,
              hour,
              minute,
              isAM,
              isADD,
              dur,
              waitTime
            });
          }}
        >
          <Text style={{ color: "orange" }}>{route.params.isAdd?"추가":"저장"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.setTime}>
        <Text style={styles.hopeTime}>희망 도착 시간</Text>
        <View style={[styles.setRow, { left: 9 }]}>
          <TouchableOpacity
            style={styles.selectAMPM}
            onPress={() => setAM(!isAM)}
          >
            <Text
              style={{
                color: isAM ? "orange" : "darkgray",
              }}
            >
              오전
            </Text>
            <Text
              style={{
                color: !isAM ? "orange" : "darkgray",
              }}
            >
              오후
            </Text>
          </TouchableOpacity>
          <TextInput
          
            style={[styles.clock]}
            onChangeText={onChangeHour}
            keyboardType="numeric"
            value={hour}
            // onChangeText={(text)=> this.onChanged(text)}
            placeholder="00"
            maxLength={2} //setting limit of input
          />
          <Text style={[styles.clock]}>:</Text>
          <TextInput
            style={[styles.clock]}
            onChangeText={onChangeMinute}
            keyboardType="numeric"
            value={minute}
            // onChangeText={(text)=> this.onChanged(text)}
            placeholder="00"
            maxLength={2} //setting limit of input
          />
        </View>
        <View style={[styles.setRow, styles.week, { left: -9 }]}>
          {weekIndexinfo.map((index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  newarr = [...weekinfo];
                  newarr[index] = !newarr[index];
                  setWeekinfo(newarr);
                }}
              >
                <Text
                  key={index}
                  style={[
                    styles.day,
                    { color: weekinfo[index] ? "orange" : "black" },
                  ]}
                >
                  {weekNameinfo[index]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.options}>
        <TextInput
          onChangeText={onChangeAlarmName}
          value={alarmName}
          placeholder={"알람 이름"}
          style={[styles.input, styles.eachOption, styles.optionText]}
        />
        <View style={styles.line}></View>
        <View
          style={[styles.setRow, styles.setSpaceBetween, styles.eachTextOption]}
        >
          <Text style={styles.optionText}>도착 장소</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Map")}>
            {console.log("ad:",route.params.pnt)}
            <Text>{route.params.des==undefined?'도착 장소 고르기':route.params.des}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.setRow, styles.setSpaceBetween, styles.eachOption]}
        >
          <Text style={styles.optionText}>진동</Text>
          <Switch
            trackColor={{ false: "#767577", true: "orange" }}
            thumbColor={isEnabledVibe ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabledVibe}
            style={styles.switch}
          />
        </View>

        <View style={[styles.setRow, styles.setSpaceBetween]}>
          <Text style={styles.optionText}>알람 소리</Text>
          <Switch
            trackColor={{ false: "#767577", true: "orange" }}
            thumbColor={isEnabledSound ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabledSound}
            style={styles.switch}
          />
        </View>
        <View style={[styles.setRow, styles.setSpaceBetween]}>
          <Text style={styles.optionText}>다시 울림</Text>
          <Switch
            trackColor={{ false: "#767577", true: "orange" }}
            thumbColor={isEnabledRe ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabledRe}
            style={styles.switch}
          />
        </View>
        <View
          style={[styles.setRow, styles.setSpaceBetween, styles.eachTextOption]}
        >
          <Text style={styles.optionText}>준비 시간</Text>
          {/* <TextInput
            autoFocus 
            keyboardType="numeric"
            placeholder="5"
            style={[styles.minuteInput, , styles.optionText]}
          /> */}
          <TextInput
            style={[styles.minuteInput, , styles.optionText]}
            keyboardType="numeric"
            // onChangeText={(text)=> this.onChanged(text)}
            value={waitTime}
            maxLength={2} //setting limit of input
            onChangeText={onChangeWaitTime}
          />
          <Text style={styles.optionText}>분</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minuteInput: {
    right: -90,
  },
  day: {
    marginLeft: 10,
  },
  line: {
    marginTop: 8,
    backgroundColor: "black",
    width: 320,
    height: 0.3,
  },
  optionSubText: {
    color: "darkgray",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "300",
  },
  eachOption: {
    marginTop: 20,
  },
  eachTextOption: {
    marginTop: 23,
  },
  selectAMPM: {
    top: 20,
    marginRight: 20,
    left: -40,
    position: "absolute",
  },
  clock: {
    fontSize: 60,
    fontWeight: "700",
    marginRight: 20,
  },
  setSpaceBetween: {
    justifyContent: "space-between",
  },
  setRow: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
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
  addAlarm: {
    fontSize: 25,
    top: -9,
  },
  leftText: {
    fontSize: 26,
    fontWeight: "600",
    color: "white",
  },
  timer: {
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 45,
    borderRadius: 25,
    elevation: 7,
  },
  rowView1: {
    flexDirection: "row",
    marginBottom: 5,
  },
  rowView2: {
    flexDirection: "row",
  },

  alarmName: {
    fontSize: 17,
  },
  arrive: {
    bottom: -7,
    marginLeft: 2,
    fontSize: 8,
    marginBottom: 7,
  },
  ampm: {
    bottom: -34,
    fontSize: 15,
    marginRight: 2,
  },
  time: {
    fontWeight: "600",
    letterSpacing: -2,
    fontSize: 40,
  },
  switch: {
    bottom: -5,
  },
  hopeTime: {
    fontWeight: "700",
  },
  setTime: {
    alignItems: "center",
    // marginBottom:50,
  },
  week: {
    marginTop: 40,
  },
  options: {
    padding: 30,
  },
});
