import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Sizes } from "@/constants/Sizes";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { IUser } from "@/types";
import AuthNav from "@/components/profile/AuthNav";
import { Image } from "expo-image";

export default function Profile() {
	const scheme = useColorScheme();
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkAuthStatus = async () => {
		try {
			const token = await AsyncStorage.getItem("authToken");
			const userData = await AsyncStorage.getItem("userData");

			console.log("Local Storage User Data:", userData);

			if (token && userData) {
				const response = await fetch(
					`${process.env.EXPO_PUBLIC_DEV_API}/auth/login`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const result = await response.json();
				console.log("Result of Auto Login:", JSON.stringify(result, null, 2));

				if (response.ok && result.success) {
					setUser(JSON.parse(userData));
					setIsLoggedIn(true);
				} else {
					await AsyncStorage.removeItem("authToken");
					await AsyncStorage.removeItem("userData");

					setUser(null);
					setIsLoggedIn(false);
				}
			} else {
				setUser(null);
				setIsLoggedIn(false);
			}
		} catch (error) {
			console.error("Error checking authentication status:", error);
			setUser(null);
			setIsLoggedIn(false);
		} finally {
			console.log(
				"userData after checking token:",
				JSON.stringify(await AsyncStorage.getItem("userData"), null, 2)
			);
		}
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem("authToken");
		await AsyncStorage.removeItem("userData");
		setUser(null);
		setIsLoggedIn(false);
	};

	useFocusEffect(
		React.useCallback(() => {
			checkAuthStatus();
		}, [])
	);

	const calculateAge = (birthday: string | Date) => {
		const birthDate = new Date(birthday);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();

		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	};

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
						<Image
							style={styles.profilePicture}
							source={
								user.gender === "female"
									? require("@/assets/images/profile/woman.png")
									: require("@/assets/images/profile/man.png")
							}
							contentFit="scale-down"
						/>

						<View style={styles.dataWrapper}>
							<Text
								style={{
									fontWeight: "bold",
									fontSize: Sizes.text.larger,
									color:
										scheme === "dark" ? Colors.dark.text : Colors.light.text,
									marginBottom: Sizes.margin.larger,
								}}
							>
								Welcome, {user.firstName} {user.lastName}!
							</Text>
							<Text>Email: {user.email}</Text>
							<Text>Age: {calculateAge(user.birthday)}</Text>
							<Text>Gender: {user.gender === "male" ? "Male" : "Female"}</Text>
							<Text>Phone Number: {user.phoneNumber}</Text>
						</View>
						<TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
							<Text style={styles.btnText}>Logout</Text>
						</TouchableOpacity>
					</View>
				) : (
					<AuthNav />
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},

	options: {
		padding: Sizes.padding.larger,
		gap: Sizes.margin.larger,
	},

	userDetailsCard: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: Sizes.padding.larger,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 3,
		marginBottom: Sizes.margin.larger,
		gap: Sizes.margin.large,
	},

	dataWrapper: {
		borderColor: "#ccc",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		padding: Sizes.padding.normal,
	},

	profilePicture: {
		height: 150,
		width: "100%",
		padding: 24,
	},

	logoutBtn: {
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
