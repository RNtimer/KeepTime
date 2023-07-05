import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

const MaxWidth = Dimensions.get("window").width;

export default function Map({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [point, setPoint] = useState([]);
  const [detailArray, setDetailArray] = useState([]);
  const [duration, setDuration] = useState(null);
  const [mode, setMode] = useState("DRIVING");

  const mapRef = useRef(null);

  const handleLayout = () => {
    if (mapRef.current && detailArray.length > 0) {
      const coordinates = detailArray.map((detail) => ({
        latitude: detail.geometry.location.lat,
        longitude: detail.geometry.location.lng,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("위치 권한이 거부되었습니다.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    let origin, pointEncoded, key, url;
    if (point[0] && point[1]) {
      origin = "place_id:" + point[0].place_id;
      pointEncoded = "place_id:" + point[1].place_id;
      key = "AIzaSyBINIoP-2MwtGUoKMg76Ea4FdNA1H6sroo";

      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${pointEncoded}&mode=${mode.toLowerCase()}&key=${key}`;

      axios
        .get(url)
        .then((res) => {
          const { duration } = res.data.routes[0].legs[0];

          setDuration(duration.text); // 예상 시간 설정
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [point, mode]);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={({ map }) => navigation.pop(map)}>
          <Text style={{ color: "orange", fontSize: 20, marginHorizontal: 5 }}>
            {"<"}뒤로
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (point[0] && point[1] && duration) {
              console.log("pnst:",  point[1].description)
              des = point[1].description
              navigation.navigate("Edit", {
                des,
                duration,
              });
            } else {
              if (point[0] && point[1])
                Alert.alert("경고", "데이터가 없습니다!");
              else Alert.alert("경고", "장소를 입력해주세요!");
            }
          }}
        >
          <Text style={styles.Navbar}>저장</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            minLength={2}
            placeholder="출발지 입력"
            query={{
              key: "AIzaSyBINIoP-2MwtGUoKMg76Ea4FdNA1H6sroo",
            }}
            keyboardShouldPersistTaps={"handled"}
            fetchDetails={true}
            onPress={(data, details) => {
              let copy = [...point];
              copy[0] = data;
              setPoint(copy);
              let copy1 = [...detailArray];
              copy1[0] = details;
              setDetailArray(copy1);
            }}
            keepResultsAfterBlur={true}
            enablePoweredByContainer={false}
          />
        </View>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            minLength={2}
            placeholder="도착지 입력"
            query={{
              key: "AIzaSyBINIoP-2MwtGUoKMg76Ea4FdNA1H6sroo",
            }}
            keyboardShouldPersistTaps={"handled"}
            fetchDetails={true}
            onPress={(data, details) => {
              let copy = [...point];
              copy[1] = data;
              setPoint(copy);
              let copy1 = [...detailArray];
              copy1[1] = details;
              setDetailArray(copy1);
            }}
            keepResultsAfterBlur={true}
            enablePoweredByContainer={false}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => setMode("DRIVING")}>
          <AntDesign
            name="car"
            size={35}
            color={(mode === "DRIVING" && "blue") || "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("WALKING")}>
          <MaterialCommunityIcons
            name="walk"
            size={35}
            color={(mode === "WALKING" && "blue") || "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("BICYCLING")}>
          <FontAwesome
            name="bicycle"
            size={35}
            color={(mode === "BICYCLING" && "blue") || "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("TRANSIT")}>
          <MaterialIcons
            name="directions-transit"
            size={35}
            color={(mode === "TRANSIT" && "blue") || "black"}
          />
        </TouchableOpacity>
      </View>
      {currentLocation && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onLayout={handleLayout}
        >
          {detailArray[0] && (
            <Marker
              coordinate={{
                latitude: detailArray[0].geometry.location.lat,
                longitude: detailArray[0].geometry.location.lng,
              }}
              title="출발지"
            />
          )}
          {detailArray[1] && (
            <Marker
              coordinate={{
                latitude: detailArray[1].geometry.location.lat,
                longitude: detailArray[1].geometry.location.lng,
              }}
              title="도착지"
            />
          )}
          {detailArray[0] && detailArray[1] && (
            <MapViewDirections
              origin={"place_id:" + point[0].place_id}
              destination={"place_id:" + point[1].place_id}
              apikey="AIzaSyBINIoP-2MwtGUoKMg76Ea4FdNA1H6sroo"
              strokeWidth={4}
              strokeColor="hotpink"
              mode={mode.toUpperCase()}
            />
          )}
        </MapView>
      )}
      <View style={styles.durationContainer}>
        {point[1] && (
          <Text style={{ fontWeight: 500, fontSize: 25 }}>
            {point[1].description}
          </Text>
        )}
        {duration && (
          <Text style={styles.durationText}>예상 시간: {duration}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  Navbar: {
    color: "orange",
    fontSize: 20,
    marginHorizontal: 5,
  },
  search: {
    alignItems: "center",
  },
  searchContainer: {
    margin: 10,
    marginBottom: 10,
    flexDirection: "row",
    width: MaxWidth * 0.6,
    borderWidth: 1,
    borderRadius: 5,
  },
  durationContainer: {
    backgroundColor: "white",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  durationText: {
    fontWeight: "bold",
  },
});
