import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import moment from "moment-hijri";

interface PrayerTimes {
  Shubh: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerTime: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const locationResponse = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );

        setLocation(locationResponse.data.locality);

        const response = await axios.get(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=20`
        );

        const timings = response.data.data.timings;
        const formattedTimings: PrayerTimes = {
          Shubh: timings.Fajr,
          Sunrise: timings.Sunrise,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        };

        setPrayerTimes(formattedTimings);
      } catch (error) {
        setError("Failed to fetch prayer times");
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  const arabicNumerals = (date: string) => {
    return date.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩".charAt(Number(d)));
  };

  const currentDate = new Date();
  const formattedDate = moment(currentDate).format("dddd, D MMMM YYYY");
  const formattedHijriDate = arabicNumerals(
    moment(currentDate).format("iD iMMMM iYYYY")
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E8449" />
        <Text style={styles.loadingText}>Loading prayer times...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>Current location <Text style={{color: "yellow"}}>{location}</Text></Text>
        <View style={styles.buttonContainer}>
          {/* <View style={styles.button}>
            <Text style={styles.buttonText}>Lokasi Masjid</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Arah Kiblat</Text>
          </View> */}
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.hijriDate}>{formattedHijriDate}</Text>
      </View>
      {prayerTimes && (
        <>
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            {Object.entries(prayerTimes).map(([prayer, time]) => (
              <View key={prayer} style={styles.prayerTimeContainer}>
                <Text style={styles.prayer}>{prayer}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#1E8449",
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  location: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },
  hijriDate: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 5,
  },
  prayerTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  prayer: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  time: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1E8449',
    fontWeight: '600',
  }
});

export default PrayerTime;
