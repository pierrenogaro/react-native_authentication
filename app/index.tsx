import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  useEffect(() => {
    AsyncStorage.getItem("auth_token").then((t) => {
      if (t) router.replace("/hello");
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TouchableOpacity onPress={() => router.push("/login")} style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/register")} style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Inscription</Text>
      </TouchableOpacity>
    </View>
  );
}
