import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";

export default function Header({ title }: { title: string }) {
	const scheme = useColorScheme();

	return (
		<SafeAreaView
			style={{
				alignItems: "center",
				padding: Sizes.padding.normal,
				borderBottomColor: "#bdbdbd",
				borderBottomWidth: 0.5,
				backgroundColor:
					scheme === "dark" ? Colors.dark.background : Colors.light.background,
			}}
		>
			<Text
				style={{
					color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
					fontSize: Sizes.text.larger,
					fontWeight: "bold",
				}}
			>
				{title}
			</Text>
		</SafeAreaView>
	);
}
