import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

export default function Map() {
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
          styles={styles.input}
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
          styles={styles.input}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "DRIVING" && styles.selectedModeButton,
          ]}
          onPress={() => setMode("DRIVING")}
        >
          <Text style={styles.modeButtonText}>DRIVING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "WALKING" && styles.selectedModeButton,
          ]}
          onPress={() => setMode("WALKING")}
        >
          <Text style={styles.modeButtonText}>WALKING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "BICYCLING" && styles.selectedModeButton,
          ]}
          onPress={() => setMode("BICYCLING")}
        >
          <Text style={styles.modeButtonText}>BICYCLING</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "TRANSIT" && styles.selectedModeButton,
          ]}
          onPress={() => setMode("TRANSIT")}
        >
          <Text style={styles.modeButtonText}>TRANSIT</Text>
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
      {duration && (
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>예상 시간: {duration}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    marginTop: 20,
    padding: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  durationContainer: {
    backgroundColor: "#fff",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  durationText: {
    fontWeight: "bold",
  },
});
