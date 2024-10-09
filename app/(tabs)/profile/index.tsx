import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Sizes } from "@/constants/Sizes";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";

export default function Profile() {
	const scheme = useColorScheme();

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
						style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
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
						style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
					>
						Register
					</Link>
				</TouchableOpacity>
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

	link: {
		textAlign: "center",
	},
});
