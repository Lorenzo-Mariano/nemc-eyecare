import React, { useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { Sizes } from "@/constants/Sizes";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AuthNav from "@/components/profile/AuthNav";
import { Image } from "expo-image";
import { useAuth } from "@/components/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
	const scheme = useColorScheme();
	const { user, isLoggedIn, fetching, setLoggedIn, setUser } = useAuth();

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

	if (fetching) {
		return (
			<View>
				<ActivityIndicator size="large" color={Colors.light.theme} />
			</View>
		);
	}

	if (isLoggedIn && user) {
		return (
			<ScrollView contentContainerStyle={styles.page}>
				<View style={styles.options}>
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
							<Text>
								Welcome, {user.firstName} {user.lastName}!
							</Text>
							<Text>Email: {user.email}</Text>
							<Text>Age: {calculateAge(user.birthday)}</Text>
							<Text>Gender: {user.gender === "male" ? "Male" : "Female"}</Text>
							<Text>Phone Number: {user.phoneNumber}</Text>
						</View>
						<TouchableOpacity
							style={styles.logoutBtn}
							onPress={async () => {
								await AsyncStorage.multiRemove(["userData", "authToken"]);
								setUser(null);
								setLoggedIn(false);
							}}
						>
							<Text style={styles.btnText}>Logout</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.page}>
			<View style={styles.options}>
				<AuthNav />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "#fff",
	},
	options: {
		padding: Sizes.padding.larger,
		gap: Sizes.margin.larger,
		backgroundColor: "#fff",
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
