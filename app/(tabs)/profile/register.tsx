import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	ScrollView,
	Alert,
	StyleSheet,
	ColorSchemeName,
} from "react-native";
import { Sizes } from "@/constants/Sizes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";

export default function Register() {
	const scheme = useColorScheme();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		age: "",
		gender: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
	});

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleRegister = async () => {
		const {
			firstName,
			lastName,
			email,
			age,
			gender,
			phoneNumber,
			password,
			confirmPassword,
		} = formData;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!age ||
			!gender ||
			!phoneNumber ||
			!password ||
			!confirmPassword
		) {
			Alert.alert("Validation Error", "Please fill in all fields.");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			Alert.alert("Validation Error", "Passwords do not match.");
			return;
		}

		if (formData.password.length < 6) {
			Alert.alert(
				"Validation Error",
				"Password must be at least 6 characters long."
			);
			return;
		}

		const dataToSend = {
			...formData,
			age: parseInt(age),
		};

		try {
			const response = await fetch("http://localhost:3000/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSend),
			});

			const result = await response.json();
			if (response.ok) {
				Alert.alert("Success", "User registered successfully!");
			} else {
				Alert.alert("Registration Error", result.message || "Error occurred.");
			}
		} catch (error) {
			Alert.alert("Network Error", "An error occurred during registration.");
		}
	};

	return (
		<ScrollView style={styles(scheme).scrollView}>
			<Text style={styles(scheme).headerText}>Register</Text>

			<TextInput
				placeholder="First Name"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.firstName}
				onChangeText={(value) => handleInputChange("firstName", value)}
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Last Name"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.lastName}
				onChangeText={(value) => handleInputChange("lastName", value)}
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Email"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.email}
				onChangeText={(value) => handleInputChange("email", value)}
				keyboardType="email-address"
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Age"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.age}
				onChangeText={(value) => handleInputChange("age", value)}
				keyboardType="numeric"
				style={styles(scheme).input}
			/>

			<Picker
				selectedValue={formData.gender}
				onValueChange={(value) => handleInputChange("gender", value)}
				style={styles(scheme).picker}
			>
				<Picker.Item label="Select Gender" value="" />
				<Picker.Item label="Male" value="male" />
				<Picker.Item label="Female" value="female" />
			</Picker>

			<TextInput
				placeholder="Phone Number"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.phoneNumber}
				onChangeText={(value) => handleInputChange("phoneNumber", value)}
				keyboardType="phone-pad"
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Password"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.password}
				onChangeText={(value) => handleInputChange("password", value)}
				secureTextEntry={true}
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Confirm Password"
				placeholderTextColor={
					scheme === "dark" ? Colors.dark.text : Colors.light.text
				}
				value={formData.confirmPassword}
				onChangeText={(value) => handleInputChange("confirmPassword", value)}
				secureTextEntry={true}
				style={styles(scheme).input}
			/>
		</ScrollView>
	);
}

const styles = (scheme: ColorSchemeName) => {
	return StyleSheet.create({
		scrollView: {
			padding: Sizes.padding.large,
			backgroundColor:
				scheme === "dark"
					? Colors.dark.lighterBackground
					: Colors.light.darkerBackground,
		},

		headerText: {
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			fontSize: Sizes.text.largest,
			padding: Sizes.padding.larger,
			marginBottom: Sizes.margin.larger,
			textAlign: "center",
			fontWeight: "bold",
		},

		container: {
			padding: Sizes.padding.normal,
			backgroundColor:
				scheme === "dark"
					? Colors.dark.lighterBackground
					: Colors.light.darkerBackground,
		},
		title: {
			fontSize: 24,
			marginBottom: 20,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
		},
		input: {
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			padding: 10,
			marginBottom: 10,
		},
		picker: {
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			padding: 10,
			marginBottom: 10,
		},
	});
};
