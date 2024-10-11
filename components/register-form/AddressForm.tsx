import { Text, TextInput, StyleSheet, ColorSchemeName } from "react-native";
import React from "react";
import { RegisterFormData } from "@/types";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Sizes } from "@/constants/Sizes";

export default function AddressForm({
	formData,
	handleAddressChange,
}: {
	formData: RegisterFormData;
	handleAddressChange: (name: any, value: any) => void;
}) {
	const scheme = useColorScheme();

	return (
		<>
			<Text style={styles(scheme).sectionHeader}>Address</Text>

			<TextInput
				placeholder="Building Number"
				value={formData.address.buildingNumber}
				onChangeText={(value) => handleAddressChange("buildingNumber", value)}
				style={styles(scheme).input}
			/>
			<TextInput
				placeholder="Barangay"
				value={formData.address.barangay}
				onChangeText={(value) => handleAddressChange("barangay", value)}
				style={styles(scheme).input}
			/>
			<TextInput
				placeholder="City or Municipality"
				value={formData.address.cityMunicipality}
				onChangeText={(value) => handleAddressChange("cityMunicipality", value)}
				style={styles(scheme).input}
			/>
			<TextInput
				placeholder="Province (optional)"
				value={formData.address.province}
				onChangeText={(value) => handleAddressChange("province", value)}
				style={styles(scheme).input}
			/>
			<TextInput
				placeholder="District (optional)"
				value={formData.address.district}
				onChangeText={(value) => handleAddressChange("district", value)}
				style={styles(scheme).input}
			/>
			<TextInput
				placeholder="ZIP Code (4 digits)"
				value={formData.address.zipCode}
				onChangeText={(value) => handleAddressChange("zipCode", value)}
				keyboardType="numeric"
				style={styles(scheme).input}
			/>
		</>
	);
}

const styles = (scheme: ColorSchemeName) => {
	return StyleSheet.create({
		sectionHeader: {
			fontSize: Sizes.text.large,
			fontWeight: "bold",
			marginTop: Sizes.margin.large,
			marginBottom: Sizes.margin.large,
		},
		input: {
			flex: 1,
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			padding: 10,
			marginBottom: 10,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: "#ccc",
		},
	});
};
