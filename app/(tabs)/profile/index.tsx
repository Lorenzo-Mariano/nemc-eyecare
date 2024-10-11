import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Sizes } from "@/constants/Sizes";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { User } from "@/types"; // Adjust the import according to your file structure

export default function Profile() {
	const scheme = useColorScheme();
	const [user, setUser] = useState<User | null>(null); // Use User type or null
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkAuthStatus = async () => {
		const token = await AsyncStorage.getItem("authToken");
		const userData = await AsyncStorage.getItem("userData");

		if (token && userData) {
			setUser(JSON.parse(userData)); // Parse the user data from AsyncStorage
			setIsLoggedIn(true);
		} else {
			setUser(null);
			setIsLoggedIn(false);
		}
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem("authToken"); // Clear the token
		await AsyncStorage.removeItem("userData"); // Clear user data
		setUser(null); // Reset the user state
		setIsLoggedIn(false); // Update login status
	};

	useFocusEffect(
		React.useCallback(() => {
			checkAuthStatus();
		}, [])
	);

	return (
		<ScrollView
			style={{
				padding: Sizes.padding.normal,
				backgroundColor:
					scheme === "dark"
						? Colors.dark.lighterBackground
						: Colors.light.darkerBackground,
			}}
			contentContainerStyle={styles.page}
		>
			<View style={styles.options}>
				{isLoggedIn && user ? (
					<View style={styles.userDetailsCard}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: Sizes.text.larger,
								color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
								marginBottom: Sizes.margin.larger,
							}}
						>
							Welcome, {user.firstName} {user.lastName}!
						</Text>
						<Text>Email: {user.email}</Text>
						<Text>Age: {user.age}</Text>
						<Text>Gender: {user.gender}</Text>
						<Text>Phone Number: {user.phoneNumber}</Text>
						<Text>
							Account Created: {new Date(user.createdAt).toLocaleDateString()}
						</Text>
						<Text>
							Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
						</Text>
						<TouchableOpacity
							style={{
								padding: Sizes.padding.large,
								backgroundColor:
									scheme === "dark" ? Colors.dark.theme : Colors.light.theme,
								marginTop: Sizes.margin.larger,
							}}
							onPress={handleLogout} // Call handleLogout on press
						>
							<Text
								style={{
									color: "#fff",
									fontWeight: "bold",
									textAlign: "center",
								}}
							>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: Sizes.text.larger,
								color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
								marginBottom: Sizes.margin.larger,
							}}
						>
							You are not logged in. Sign up or login to use all features.
						</Text>

						<TouchableOpacity
							style={{
								padding: Sizes.padding.large,
								backgroundColor:
									scheme === "dark" ? Colors.dark.theme : Colors.light.theme,
							}}
						>
							<Link
								href={"/profile/login"}
								style={{
									color: "#fff",
									fontWeight: "bold",
									textAlign: "center",
								}}
							>
								Login
							</Link>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								padding: Sizes.padding.large,
								backgroundColor:
									scheme === "dark" ? Colors.dark.theme : Colors.light.theme,
							}}
						>
							<Link
								href={"/profile/register"}
								style={{
									color: "#fff",
									fontWeight: "bold",
									textAlign: "center",
								}}
							>
								Register
							</Link>
						</TouchableOpacity>
					</>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		// flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},

	options: {
		padding: Sizes.padding.larger,
		gap: Sizes.margin.larger,
	},

	userDetailsCard: {
		backgroundColor: "#fff", // Set background color to white
		borderRadius: 10, // Add rounded corners
		padding: Sizes.padding.large, // Add padding for spacing
		shadowColor: "#000", // Set shadow color
		shadowOffset: { width: 0, height: 1 }, // Set shadow offset
		shadowOpacity: 0.2, // Set shadow opacity
		shadowRadius: 2, // Set shadow blur radius
		elevation: 3, // Android shadow
		marginBottom: Sizes.margin.larger, // Space below the card
	},
});
