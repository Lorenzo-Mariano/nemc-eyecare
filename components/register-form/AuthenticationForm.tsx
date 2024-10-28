import { Text, TextInput, StyleSheet, ColorSchemeName } from "react-native";
import React from "react";
import { IRegisterFormData } from "@/util/types";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AuthenticationForm({
	formData,
	handleInputChange,
}: {
	formData: IRegisterFormData;
	handleInputChange: (name: any, value: any) => void;
}) {
	const scheme = useColorScheme();

	return (
		<>
			<Text style={styles(scheme).sectionHeader}>Authentication</Text>

			<TextInput
				placeholder="Email"
				placeholderTextColor={"#ccc"}
				value={formData.email}
				onChangeText={(value) => handleInputChange("email", value)}
				keyboardType="email-address"
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Password"
				placeholderTextColor={"#ccc"}
				value={formData.password}
				onChangeText={(value) => handleInputChange("password", value)}
				secureTextEntry={true}
				style={styles(scheme).input}
			/>

			<TextInput
				placeholder="Confirm Password"
				placeholderTextColor={"#ccc"}
				value={formData.confirmPassword}
				onChangeText={(value) => handleInputChange("confirmPassword", value)}
				secureTextEntry={true}
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
