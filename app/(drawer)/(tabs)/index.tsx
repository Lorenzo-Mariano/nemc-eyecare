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
			<View
				style={{
					marginTop: Sizes.margin.small,
				}}
			>
				<Text
					style={{
						color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
						fontSize: Sizes.text.largest,
						fontWeight: "bold",
					}}
				>
					Welcome, Pedro
				</Text>

				<Text
					style={{
						fontSize: Sizes.text.normal,
						color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
					}}
				>
					You have so-and-so appointments this month.
				</Text>
				<Text
					style={{
						fontSize: Sizes.text.normal,
						color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
					}}
				>
					Remember to take so-and-so drug [freq.] times a [day/week/month] for
					[time span days/weeks/month]
				</Text>
			</View>
			<View>
				<Text
					style={{
						color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
						fontSize: Sizes.text.largest,
						fontWeight: "bold",
						marginBottom: Sizes.margin.large,
					}}
				>
					Services
				</Text>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						gap: Sizes.margin.large,
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							borderRadius: Sizes.borderRadius.larger,

							backgroundColor: "#72b4ed",
							width: 72,
							height: 72,
						}}
					>
						<Text
							style={{
								color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
								fontSize: Sizes.text.normal,
							}}
						>
							Find a Doctor
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
}
