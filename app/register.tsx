import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    await fetch("https://backend.imatrythis.com/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Inscription</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
        <Text style={{ fontSize: 20 }}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()} style={{ padding: 16 }}>
        <Text style={{ fontSize: 20 }}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}
