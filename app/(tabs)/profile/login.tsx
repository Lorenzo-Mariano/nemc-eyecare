import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	TouchableOpacity,
} from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Sizes } from "@/constants/Sizes";

export default function Login() {
	const router = useRouter();
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
						birthday: user.birthday,
						gender: user.gender,
						phoneNumber: user.phoneNumber,
						address: user.address,
					})
				);

				Alert.alert("Login Successful", `Welcome back, ${user.firstName}!`, [
					{
						text: "OK",
						onPress: () => {
							if (result.message === "Login successful!") {
								router.replace("/(tabs)/profile");
							}
						},
					},
				]);
			} else {
				Alert.alert("Login Failed", result.message);
			}
		} catch (error) {
			console.error("Login error", error);
			Alert.alert("Error", "Something went wrong, please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<View style={styles.page}>
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

				<TouchableOpacity
					onPress={() => handleLogin(email, password)}
					style={styles.loginBtn}
				>
					<Text style={styles.btnText}>
						{isSubmitting ? "Logging in..." : "Login"}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		padding: Sizes.padding.large,
		backgroundColor: Colors.light.darkerBackground,
	},

	container: {
		height: 400,
		padding: 20,
		borderRadius: 12,

		borderColor: "#ccc",
		borderWidth: 1,
		justifyContent: "center",
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

	loginBtn: {
		padding: Sizes.padding.large,
		borderColor: Colors.light.theme,
		borderWidth: 1,
		borderRadius: 8,
	},

	btnText: {
		color: Colors.light.theme,
		fontWeight: "bold",
		textAlign: "center",
	},
});
