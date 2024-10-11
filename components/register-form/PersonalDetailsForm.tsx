import {
	Text,
	TextInput,
	StyleSheet,
	ColorSchemeName,
	View,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { RegisterFormData } from "@/types";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
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
				<View style={styles(scheme).pickerWrapper}>
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
				</View>

				<TextInput
					placeholder="Phone Number"
					placeholderTextColor={"#ccc"}
					value={formData.phoneNumber}
					onChangeText={(value) => handleInputChange("phoneNumber", value)}
					keyboardType="phone-pad"
					style={styles(scheme).input}
				/>
			</View>

			<View>
				<View
					style={{
						flexDirection: "row",
						gap: Sizes.margin.normal,
						marginBottom: Sizes.margin.large,
					}}
				>
					<View style={styles(scheme).dateDisplay}>
						<Text style={styles(scheme).dateText}>
							{formData.birthday
								? new Date(formData.birthday).toISOString().slice(0, 10)
								: "YYYY-MM-DD"}
						</Text>
					</View>
					<TouchableOpacity
						style={styles(scheme).selectButton}
						onPress={() => setShowDatePicker(true)}
					>
						<Text style={styles(scheme).buttonText}>Select Birthday</Text>
					</TouchableOpacity>
				</View>

				{showDatePicker && (
					<DateTimePicker
						value={formData.birthday ? new Date(formData.birthday) : new Date()}
						mode="date"
						display="default"
						onChange={handleDateChange}
					/>
				)}
			</View>

			<View style={styles(scheme).pickerWrapper}>
				<Picker
					selectedValue={formData.civilStatus}
					onValueChange={(value) => handleInputChange("civilStatus", value)}
					style={styles(scheme).picker}
					itemStyle={{ color: "#ccc" }}
				>
					<Picker.Item label="Civil Status" color="#ccc" value="" />
					<Picker.Item label="Single" value="single" />
					<Picker.Item label="Married" value="married" />
					<Picker.Item label="Divorced" value="divorced" />
					<Picker.Item label="Widowed" value="widowed" />
				</Picker>
			</View>
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
		pickerWrapper: {
			flex: 1,
			flexDirection: "row",
			borderColor: "#ccc",
			borderWidth: 1,
			borderRadius: 5,
			overflow: "hidden",
			marginBottom: 10,
			paddingRight: 20,
		},
		picker: {
			flex: 1,
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: "#ccc",
		},
		dateInput: {
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			padding: 10,
			marginBottom: 10,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: "#ccc",
			justifyContent: "center",
			alignItems: "center",
		},
		dateDisplay: {
			flex: 1,
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			padding: 10,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: "#ccc",
			justifyContent: "center",
			alignItems: "center",
		},
		dateText: {
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			fontSize: Sizes.text.normal,
		},
		selectButton: {
			backgroundColor:
				scheme === "dark" ? Colors.dark.background : Colors.light.background,
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: Colors.light.theme,
			justifyContent: "center",
			alignItems: "center",
		},
		buttonText: {
			color: scheme === "dark" ? Colors.dark.theme : Colors.light.theme,
			fontSize: Sizes.text.normal,
		},
	});
};
