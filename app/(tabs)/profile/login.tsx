import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);

	const handleLogin = async () => {
		setSubmitting(true);

		if (!email || !password) {
			Alert.alert("Validation Error", "Please enter both email and password.");
			return setSubmitting(false);
		}

		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email.trim(),
						password: password.trim(),
					}),
				}
			);

			const result = await response.json();

			if (response.ok) {
				Alert.alert("Success", result.message);
			} else {
				Alert.alert("Login Error", result.message || "Error occurred.");
			}
		} catch (error) {
			Alert.alert("Network Error", "An error occurred during login.");
		}

		setSubmitting(false);
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
				onPress={handleLogin}
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
