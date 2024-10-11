import {
	Text,
	TextInput,
	StyleSheet,
	ColorSchemeName,
	View,
} from "react-native";
import React, { useState } from "react";
import { RegisterFormData } from "@/types";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PersonalDetailsForm({
	formData,
	handleInputChange,
}: {
	formData: RegisterFormData;
	handleInputChange: (name: any, value: any) => void;
}) {
	const scheme = useColorScheme();
	const [showDatePicker, setShowDatePicker] = useState(false); // State for the Date Picker

	const handleDateChange = (event: any, selectedDate: Date | undefined) => {
		const currentDate = selectedDate || formData.birthday;
		setShowDatePicker(false);
		handleInputChange("birthday", currentDate);
	};

	return (
		<>
			<Text style={styles(scheme).sectionHeader}>Personal Details</Text>

			<View style={{ flexDirection: "row", gap: Sizes.margin.normal }}>
				<TextInput
					placeholder="First Name"
					placeholderTextColor={"#ccc"}
					value={formData.firstName}
					onChangeText={(value) => handleInputChange("firstName", value)}
					style={styles(scheme).input}
				/>

				<TextInput
					placeholder="Last Name"
					placeholderTextColor={"#ccc"}
					value={formData.lastName}
					onChangeText={(value) => handleInputChange("lastName", value)}
					style={styles(scheme).input}
				/>
			</View>

			<View style={{ flexDirection: "row", gap: Sizes.margin.normal }}>
				<Picker
					selectedValue={formData.gender}
					onValueChange={(value) => handleInputChange("gender", value)}
					style={styles(scheme).picker}
					itemStyle={{ color: "#ccc" }}
				>
					<Picker.Item label="Gender" color="#ccc" value="" />
					<Picker.Item label="Male" value="male" />
					<Picker.Item label="Female" value="female" />
				</Picker>

				<TextInput
					placeholder="Phone Number"
					placeholderTextColor={"#ccc"}
					value={formData.phoneNumber}
					onChangeText={(value) => handleInputChange("phoneNumber", value)}
					keyboardType="phone-pad"
					style={styles(scheme).input}
				/>
			</View>

			{/* Birthday picker */}
			<TextInput
				placeholder="Birthday"
				placeholderTextColor={"#ccc"}
				value={formData.birthday.toISOString().slice(0, 10)}
				onPress={() => setShowDatePicker(true)}
				style={styles(scheme).input}
			/>

			{showDatePicker && (
				<DateTimePicker
					value={formData.birthday}
					mode="date"
					display="default"
					onChange={handleDateChange}
				/>
			)}

			{/* Civil Status Picker */}
			<Picker
				selectedValue={formData.civilStatus}
				onValueChange={(value) => handleInputChange("civilStatus", value)}
				style={styles(scheme).picker}
				itemStyle={{ color: "#ccc" }}
			>
				<Picker.Item label="Civil Status" color="#ccc" value="" />
				<Picker.Item label="Single" value="single" />
				<Picker.Item label="Married" value="married" />
			</Picker>
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
		picker: {
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
