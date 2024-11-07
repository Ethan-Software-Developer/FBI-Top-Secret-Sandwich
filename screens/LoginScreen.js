import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const handleLogin = () => {
    if (!email || !password) return alert('Enter both email and password.');
    if (!isValidEmail(email)) return Alert.alert("Invalid Email", "Enter a valid email address.");
    navigation.navigate("Home");
  };

  return (
    <View style={{ backgroundColor: 'black', height, width }}>
      <StatusBar style="light" />
      <Image style={{ height, width, position: 'absolute' }} source={require("../assets/image.jpg")} />
      
      <View style={{ height, width, justifyContent: 'space-around', paddingTop: height * 0.1 }}>
        <View style={{ alignItems: 'center' }}>
          <Animatable.Text animation="fadeInUp" duration={1000} style={{ color: '#ffa500', fontWeight: 'bold', fontSize: height * 0.06 }}>
            PaySignal
          </Animatable.Text>
        </View>
      
        <View style={{ alignItems: 'center' }}>
          <Animatable.View animation="fadeInDown" duration={1000} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="white"
              style={{ height: 40, color: 'white' }}
              value={email}
              onChangeText={setEmail}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInDown" delay={200} duration={1000} style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: 15, borderRadius: 10, width: '90%', marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={secureTextEntry}
              style={{ height: 40, color: 'white', flex: 1 }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)} style={{ padding: 10 }}>
              <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={24} color="white" />
            </TouchableOpacity>
          </Animatable.View>
        </View>
        
        <Animatable.View animation="fadeInDown" delay={400} duration={1000} style={{ alignItems: 'center', width: '100%' }}>
          <TouchableOpacity style={{ width: '90%', backgroundColor: '#fff', padding: 12, borderRadius: 10 }} onPress={handleLogin}>
            <Text style={{ fontSize: height * 0.025, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" delay={600} duration={1000} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('SignUp')}>
            <Text style={{ color: '#FA7901' }}> Sign Up</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}
