import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabaseClient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/index";
type Props = NativeStackScreenProps<RootStackParamList, "SignIn">;

const SignIn: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleSignIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Alert.alert("Sign-in failed", error.message);
      } else {
        Alert.alert("Success", "Signed in successfully!");
      }
    };

  return (
    <View style={styles.main}>
      <Text style={styles.main1}>Sign In</Text>
      <TextInput style={styles.main3} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.main3} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.main2} onPress={handleSignIn}>
        <Text style={styles.main4}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.main5}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main:
   {flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20 
  },
  main1:
   {fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  main3: 
  {width: "100%", 
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  main2: 
  {backgroundColor: "blue", 
    padding: 10, 
    borderRadius: 5, 
    width: "100%", 
    alignItems: "center" 
  },
  main4: 
  {color: "white", 
   fontSize: 16 
  },
  main5: 
  {marginTop: 10, 
   color: "blue" 
  },
}
);

export default SignIn;