import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Sizes } from "@/constants/Sizes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function AuthNav() {
	const scheme = useColorScheme();

	return (
		<View
			style={{
				padding: Sizes.padding.large,
				backgroundColor: "#fff",
				borderColor: "#ccc",
				borderRadius: 6,
				borderWidth: 1,
				gap: 24,
			}}
		>
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

			<View style={{ gap: Sizes.margin.large }}>
				<TouchableOpacity
					style={{
						padding: Sizes.padding.large,
						borderColor: Colors.light.theme,
						borderWidth: 1,
						borderRadius: 8,
					}}
				>
					<Link
						href={"/profile/login"}
						style={{
							color: Colors.light.theme,
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
						borderColor: Colors.light.theme,
						borderWidth: 1,
						borderRadius: 8,
					}}
				>
					<Link
						href={"/profile/register"}
						style={{
							color: Colors.light.theme,
							fontWeight: "bold",
							textAlign: "center",
						}}
					>
						Register
					</Link>
				</TouchableOpacity>
			</View>
		</View>
	);
}
