import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import React from "react";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";

export default function Index() {
	const scheme = useColorScheme();
	const router = useRouter();

	const services = [
		{
			name: "Comprehensive eye examination",
			src: require("@/assets/images/services/eye_exam.jpg"),
		},
		{
			name: "Cataract screening and surgery",
			src: require("@/assets/images/services/cataract_screening.jpg"),
		},
		{
			name: "Laser procedure and treatment",
			src: require("@/assets/images/services/laser.webp"),
		},
		{
			name: "Eye glass fitting",
			src: require("@/assets/images/services/eyeglass_fitting.jpg"),
		},
		{
			name: "Diabetic retinopathy screening and surgery",
			src: require("@/assets/images/services/diabetic_retinopathy.jpg"),
		},
		{
			name: "Glaucoma screening and surgery",
			src: require("@/assets/images/services/glaucoma_surgery.jpg"),
		},
	];

	const diagnostics = [
		{
			name: "Visual Field test (perimetry)",
			src: require("@/assets/images/diagnostics/visual_field_test.jpg"),
		},
		{
			name: "Ocular coherence tomography (OCT)",
			src: require("@/assets/images/diagnostics/oct.webp"),
		},
		{
			name: "Fluorescein angiogram (FA)",
			src: require("@/assets/images/diagnostics/fluorescein_angiography.jpeg"),
		},
	];

	// Function to handle navigation when a service is tapped
	const handleServicePress = (serviceName: string) => {
		router.push({
			pathname: "/doctors",
			params: { service: serviceName },
		});
	};

	const renderServiceItem = ({
		item,
	}: {
		item: { name: string; src: any };
	}) => (
		<TouchableOpacity
			style={styles.serviceItem}
			onPress={() => handleServicePress(item.name)}
		>
			<Image
				source={item.src}
				style={styles.serviceImage}
				resizeMode="cover" // Makes sure the image fits within the container
				// transition={500} // Adds a smooth image load
			/>
			<Text
				style={[
					styles.serviceText,
					{ color: scheme === "dark" ? Colors.dark.text : Colors.light.text },
				]}
			>
				{item.name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<FlatList
			style={{
				flex: 1,
				padding: Sizes.padding.normal,
				backgroundColor:
					scheme === "dark"
						? Colors.dark.lighterBackground
						: Colors.light.darkerBackground,
			}}
			contentContainerStyle={{ paddingBottom: Sizes.padding.larger }}
			data={[...services, ...diagnostics]} // Combine services and diagnostics into one list
			renderItem={renderServiceItem}
			keyExtractor={(item, index) => index.toString()} // Use index as the key
			ListHeaderComponent={() => (
				<Text style={styles.headerText}>Services</Text>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: Sizes.text.largest,
		fontWeight: "bold",
		textAlign: "center",
		padding: Sizes.padding.larger,
	},

	serviceItem: {
		padding: Sizes.padding.normal,
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		marginBottom: Sizes.margin.normal,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		alignItems: "center", // Center the content in the item
	},

	serviceText: {
		fontSize: Sizes.text.normal,
		marginTop: Sizes.margin.small,
	},

	serviceImage: {
		width: "100%", // Set the width of the image to take the whole container
		height: 150, // Fixed height for consistency
		borderRadius: 8, // Make the images have rounded corners
	},
});
