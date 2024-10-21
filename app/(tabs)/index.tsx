import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Index() {
	const scheme = useColorScheme();

	const services = [
		"Comprehensive eye examination",
		"Cataract screening and surgery",
		"Laser procedure and treatment",
		"Eye glass fitting",
		"Diabetic retinopathy screening and surgery",
		"Glaucoma screening and surgery",
	];

	const diagnostics = [
		"Visual Field test (perimetry)",
		"Ocular coherence tomography (OCT)",
		"Fluorescein angiogram (FA)",
	];

	return (
		<ScrollView
			style={{
				flex: 1,
				padding: Sizes.padding.normal,
				backgroundColor:
					scheme === "dark"
						? Colors.dark.lighterBackground
						: Colors.light.darkerBackground,
			}}
			contentContainerStyle={{ paddingBottom: Sizes.padding.larger }}
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

			<View style={{ marginBottom: 24 }}>
				<Text
					style={{
						fontSize: Sizes.text.large,
						fontWeight: "bold",
						color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
						marginBottom: 12,
					}}
				>
					Treatment Services:
				</Text>

				{services.map((service, index) => (
					<Text
						key={index}
						style={{
							fontSize: Sizes.text.normal,
							marginBottom: 8,
							color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
						}}
					>
						- {service}
					</Text>
				))}
			</View>

			<View>
				<Text
					style={{
						fontSize: Sizes.text.large,
						fontWeight: "bold",
						color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
						marginBottom: 12,
					}}
				>
					Diagnostic Services:
				</Text>

				{diagnostics.map((diagnostic, index) => (
					<Text
						key={index}
						style={{
							fontSize: Sizes.text.normal,
							marginBottom: 8,
							color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
						}}
					>
						- {diagnostic}
					</Text>
				))}
			</View>
		</ScrollView>
	);
}
