import { View, Text } from "react-native";
import React from "react";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function index() {
	const scheme = useColorScheme();

	// Needs to be user-friendly, they don't know what
	// treatment they need. They just know they need a doc

	// This is an app for scheduling appointments to the
	// Services offered are:
	// Comprehensive eye examination
	// Cataract screening and surgery
	// Laser procedure and treatment
	// Eye glass fitting
	// Diabetic retinopathy screening and surgery
	// Glaucoma screening and surgery

	// Diagnostics
	// Visual Field test (perimetry)
	// Ocular coherence tomography (OCT)
	// Fluorescein angiogram (FA)
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
