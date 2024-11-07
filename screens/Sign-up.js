import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Alert, Animated, LayoutAnimation, Platform, UIManager } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Validate email
  const isValidEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);

  const handleSignUp = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (username.trim().length === 0) {
      Alert.alert("Invalid Username", "Please enter a username.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password.trim().length === 0) {
      Alert.alert("Invalid Password", "Please enter a password.");
      return;
    }
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
    navigation.navigate("Login");
  };

  return (
    <View style={{ backgroundColor: 'black', height, width }}>
      <StatusBar style="light" />
      <Image style={{ height, width, position: 'absolute' }} source={require("../assets/image.jpg")} />

      <View style={{ height, width, justifyContent: 'space-around', paddingTop: height * 0.1, paddingBottom: 10 }}>
        <View style={{ alignItems: 'center', color: "#FFD700" }}>
          <Animated.Text style={{
              opacity: fadeAnim,
              color: '#ffa500',
              fontWeight: 'bold',
              letterSpacing: 1,
              fontSize: height * 0.06
            }}>
            Join Us
          </Animated.Text>
        </View>

        <View style={{ alignItems: 'center', marginHorizontal: 16 }}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={"white"}
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={"white"}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        
        <View style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
            <Text style={styles.signupText}>SignUp</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={{ color: '#ffa500' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = {
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 16
  },
  input: {
    height: 40,
    color: 'white'
  },
  signupButton: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 'auto'
  },
  signupText: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
};
