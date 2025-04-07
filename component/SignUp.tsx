import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabaseClient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/index";
type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUp: React.FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email,
      password,
      options: { data: { first_name: firstName, last_name: lastName } }
    });


    if (error) {
      Alert.alert("Sign-up failed", error.message);
    } else {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("SignIn");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.text1}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:
  { flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20 
  },
  title: 
  { fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  input: 
  { width: "100%", 
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  button: 
  { backgroundColor: "blue", 
    padding: 10, 
    borderRadius: 5, 
    width: "100%", 
    alignItems: "center" 
  },
  buttonText: 
  { color: "white", 
    fontSize: 16 
  },
  text1: 
  { marginTop: 10, 
    color: "blue" 
  },
});

export default SignUp;
