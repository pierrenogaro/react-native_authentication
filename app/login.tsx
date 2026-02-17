import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    const res = await fetch("https://backend.imatrythis.com/api/login_check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    const token = data.token ?? data.access_token ?? data;
    if (token) {
      console.log("Token:", token);
      await AsyncStorage.setItem("auth_token", token);
      router.replace("/hello");
    }
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Connexion</Text>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ fontSize: 18, padding: 12, marginBottom: 12, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ fontSize: 18, padding: 12, marginBottom: 12, borderWidth: 1 }}
      />
      <TouchableOpacity onPress={submit} style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/register")} style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}
