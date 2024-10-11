import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);

	const handleLogin = async (email: string, password: string) => {
		setSubmitting(true);
		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			const result = await response.json();

			if (response.ok) {
				const { token, user } = result;

				await AsyncStorage.setItem("authToken", token);
				await AsyncStorage.setItem(
					"userData",
					JSON.stringify({
						_id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						age: user.age,
						gender: user.gender,
						phoneNumber: user.phoneNumber,
					})
				);

				Alert.alert("Login Successful", `Welcome back, ${user.firstName}!`);
				setSubmitting(false);
			} else {
				setSubmitting(false);
				Alert.alert("Login Failed", result.message);
			}
		} catch (error) {
			setSubmitting(false);
			console.error("Login error", error);
			Alert.alert("Error", "Something went wrong, please try again.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<Button
				title={isSubmitting ? "Logging in..." : "Login"}
				onPress={() => handleLogin(email, password)}
				disabled={isSubmitting}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: Colors.light.background,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginBottom: 15,
		borderRadius: 5,
	},
});
