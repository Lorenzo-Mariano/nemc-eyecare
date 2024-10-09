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
	ActivityIndicator,
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
	const [submitting, setSubmitting] = useState(false);

	const handleInputChange = (name: string, value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleRegister = async () => {
		setSubmitting(true);

		const {
			firstName,
			lastName,
			email,
			age,
			gender,
			phoneNumber,
			password,
			confirmPassword,
		} = {
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			email: formData.email.trim(),
			age: formData.age.trim(),
			gender: formData.gender.trim(),
			phoneNumber: formData.phoneNumber.trim(),
			password: formData.password.trim(),
			confirmPassword: formData.confirmPassword.trim(),
		};

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
			return setSubmitting(false);
		}

		if (password !== confirmPassword) {
			Alert.alert("Validation Error", "Passwords do not match.");
			return setSubmitting(false);
		}

		if (password.length < 6) {
			Alert.alert(
				"Validation Error",
				"Password must be at least 6 characters long."
			);
			return setSubmitting(false);
		}

		const dataToSend = {
			firstName,
			lastName,
			email,
			age: parseInt(age),
			gender,
			phoneNumber,
			password,
			confirmPassword,
		};

		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/auth/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataToSend),
				}
			);

			const result = await response.json();

			if (response.ok) {
				Alert.alert(
					"Success",
					result.message || "User registered successfully!"
				);
			} else if (result.errors && Array.isArray(result.errors)) {
				const errorMessages = result.errors
					.map((error: { message: string }) => error.message)
					.join("\n");
				Alert.alert("Registration Error", errorMessages);
			} else {
				Alert.alert("Registration Error", result.message || "Error occurred.");
			}
		} catch (error) {
			Alert.alert("Network Error", "An error occurred during registration.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<ScrollView style={styles(scheme).scrollView}>
			<Text style={styles(scheme).headerText}>Register</Text>

			<View style={{ flexDirection: "row", gap: Sizes.margin.normal }}>
				<TextInput
					placeholder="First Name"
					placeholderTextColor={"#ccc"}
					value={formData.firstName}
					onChangeText={(value) => handleInputChange("firstName", value)}
					style={styles(scheme).input}
				/>

				<TextInput
					placeholder="Last Name"
					placeholderTextColor={"#ccc"}
					value={formData.lastName}
					onChangeText={(value) => handleInputChange("lastName", value)}
					style={styles(scheme).input}
				/>
			</View>

			<TextInput
				placeholder="Email"
				placeholderTextColor={"#ccc"}
				value={formData.email}
				onChangeText={(value) => handleInputChange("email", value)}
				keyboardType="email-address"
				style={styles(scheme).input}
			/>

			<View style={{ flexDirection: "row", gap: Sizes.margin.normal }}>
				<Picker
					selectedValue={formData.gender}
					onValueChange={(value) => handleInputChange("gender", value)}
					style={styles(scheme).picker}
				>
					<Picker.Item label="Gender" value="" />
					<Picker.Item label="Male" value="male" />
					<Picker.Item label="Female" value="female" />
				</Picker>

				<TextInput
					placeholder="Age"
					placeholderTextColor={"#ccc"}
					value={formData.age}
					onChangeText={(value) => handleInputChange("age", value)}
					keyboardType="numeric"
					style={styles(scheme).input}
				/>
			</View>

			<TextInput
				placeholder="Phone Number"
				placeholderTextColor={"#ccc"}
				value={formData.phoneNumber}
				onChangeText={(value) => handleInputChange("phoneNumber", value)}
				keyboardType="phone-pad"
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Password"
				placeholderTextColor={"#ccc"}
				value={formData.password}
				onChangeText={(value) => handleInputChange("password", value)}
				secureTextEntry={true}
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Confirm Password"
				placeholderTextColor={"#ccc"}
				value={formData.confirmPassword}
				onChangeText={(value) => handleInputChange("confirmPassword", value)}
				secureTextEntry={true}
				style={styles(scheme).input}
			/>

			{submitting ? (
				<View style={styles(scheme).loadingContainer}>
					<ActivityIndicator size="large" color={Colors.light.theme} />
					<Text style={styles(scheme).loadingText}>Submitting...</Text>
				</View>
			) : (
				<View style={styles(scheme).buttonContainer}>
					<Button title="Register" onPress={handleRegister} />
				</View>
			)}
		</ScrollView>
	);
}

const styles = (scheme: ColorSchemeName) => {
	return StyleSheet.create({
		scrollView: {
			padding: Sizes.padding.large,
			backgroundColor: Colors.light.background,
			// backgroundColor:
			// 	scheme === "dark"
			// 		? Colors.dark.lighterBackground
			// 		: Colors.light.darkerBackground,
		},
		headerText: {
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			marginBottom: Sizes.margin.larger,
			fontSize: Sizes.text.largest,
			padding: Sizes.padding.larger,
			textAlign: "center",
			fontWeight: "bold",
		},
		status: {
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			marginBottom: Sizes.margin.larger,
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
			flex: 1,
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			padding: 10,
			marginBottom: 10,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: "#ccc",
		},
		picker: {
			flex: 1,
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			padding: 10,
			marginBottom: 10,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: "#ccc",
		},
		buttonContainer: {
			marginTop: Sizes.margin.larger,
		},
		loadingContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			marginTop: Sizes.margin.larger,
		},
		loadingText: {
			marginLeft: 10,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			fontSize: Sizes.text.large,
		},
	});
};
