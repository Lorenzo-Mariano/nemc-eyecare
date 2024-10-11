import { View, Text } from "react-native";
import React from "react";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function index() {
	const scheme = useColorScheme();

	return (
		<View
			style={{
				flex: 1,
				gap: 24,
				padding: Sizes.padding.normal,
				backgroundColor:
					scheme === "dark"
						? Colors.dark.lighterBackground
						: Colors.light.darkerBackground,
			}}
		>
			<Text
				style={{
					fontSize: Sizes.text.largest,
					fontWeight: "bold",
					textAlign: "center",
					padding: Sizes.padding.larger,
				}}
			>
				Services
			</Text>
		</View>
	);
}
