import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HelloScreen() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("auth_token");
      if (!token) {
        router.replace("/login");
        return;
      }
      const res = await fetch("https://backend.imatrythis.com/api/hello", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await res.json();
      setMessage(d.message ?? "");
    })();
  }, []);

  async function logout() {
    await AsyncStorage.removeItem("auth_token");
    router.replace("/");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>{message}</Text>
      <TouchableOpacity onPress={logout} style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}
