import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Sizes } from "@/constants/Sizes";
import { router } from "expo-router";
import { ArrowLeftCircle } from "iconoir-react-native";

export default function Header({
	title,
	showBackButton,
}: {
	title: string;
	showBackButton: boolean;
}) {
	const scheme = useColorScheme();

	return (
		<SafeAreaView
			style={{
				flexDirection: "row",
				alignItems: "center",
				padding: Sizes.padding.larger,
				borderBottomColor: "#bdbdbd",
				borderBottomWidth: 0.5,
				backgroundColor:
					scheme === "dark" ? Colors.dark.background : Colors.light.background,
			}}
		>
			{showBackButton && (
				<TouchableOpacity
					onPress={() => router.back()}
					style={{ marginRight: 12 }}
				>
					<ArrowLeftCircle color={Colors.light.theme} height={24} />
				</TouchableOpacity>
			)}
			<View
				style={{
					flex: 1,
					alignItems: showBackButton ? "flex-start" : "center",
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
			</View>
		</SafeAreaView>
	);
}
