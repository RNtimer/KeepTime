// App.tsx
import React, { useEffect } from "react";
// 각각 보여줄 화면들 불러오기
import Main from "./pages/Main";

const STORAGE_KEY = "@timers" 

// 스택 네비게이션 만들기
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';//컴포넌트추가 (네비게이션에서 사용)
import Map from './pages/Map';
import Edit from './pages/Edit'
const Stack = createNativeStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";


function App() {
  const saveTimer = () => {
    AsyncStorage.setItem(STORAGE_KEY, newTimer)
  }
  const loadTimer = () => {
    AsyncStorage.getItem(STORAGE_KEY)
  }
  useEffect(() => {
    AsyncStorage.setItem("Timers", []);
    loadTimer();
  }, []);
  
  return (
		// NavigationContainer로 감싸야 함.
		<NavigationContainer>
      <Stack.Navigator initialRouteName='Main'>
        <Stack.Screen name='Main' component={Main} />
        <Stack.Screen name='Edit' component={Edit} />
        <Stack.Screen name='Map' component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;