import React, { useState } from "react";
import {
	View,
	Text,
	Button,
	ScrollView,
	Alert,
	StyleSheet,
	ColorSchemeName,
	ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Sizes } from "@/constants/Sizes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

import { api } from "@/api/api";
import AddressForm from "@/components/register-form/AddressForm";
import AuthenticationForm from "@/components/register-form/AuthenticationForm";
import PersonalDetailsForm from "@/components/register-form/PersonalDetailsForm";

export default function Register() {
	const scheme = useColorScheme();
	const router = useRouter();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		birthday: "",
		gender: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
		civilStatus: "",
		address: {
			buildingNumber: "",
			barangay: "",
			cityMunicipality: "",
			province: "",
			district: "",
			zipCode: "",
		},
	});

	const [submitting, setSubmitting] = useState(false);

	const handleInputChange = (name: string, value: any) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleAddressChange = (name: any, value: any) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			address: {
				...prevFormData.address,
				[name]: value,
			},
		}));
	};

	const handleRegister = async () => {
		setSubmitting(true);

		// If no bday, it's ""
		// if chosen, it's 2024-10-10T02:05:00.000Z
		// console.log(formData.birthday);

		await api
			.register(formData)
			.then((res) => {
				Alert.alert(res.status, res.msg, [
					{
						text: "OK",
						onPress: () => {
							if (res.status === "Success") {
								router.replace("/(tabs)/profile/login");
							}
						},
					},
				]);
			})
			.catch((err) => {
				console.log(err);
				Alert.alert("Registration Error", err.message, [
					{
						text: "OK",
					},
				]);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	return (
		<ScrollView style={styles(scheme).scrollView}>
			<View style={styles(scheme).formSection}>
				<View style={styles(scheme).header}>
					<Link href={"/(tabs)/profile/"} style={[styles(scheme).linkWrapper]}>
						<Text style={styles(scheme).linkText}>Back</Text>
					</Link>
				</View>

				<PersonalDetailsForm
					formData={formData}
					handleInputChange={handleInputChange}
				/>
			</View>

			<View style={styles(scheme).formSection}>
				<AuthenticationForm
					formData={formData}
					handleInputChange={handleInputChange}
				/>
			</View>

			<View style={styles(scheme).formSection}>
				<AddressForm
					formData={formData}
					handleAddressChange={handleAddressChange}
				/>
			</View>

			{submitting ? (
				<View style={styles(scheme).loadingContainer}>
					<ActivityIndicator size="large" color={Colors.light.theme} />
					<Text style={styles(scheme).loadingText}>Submitting...</Text>
				</View>
			) : (
				<View style={styles(scheme).buttonContainer}>
					<Button title="Register" onPress={handleRegister} />
				</View>
			)}
		</ScrollView>
	);
}

const styles = (scheme: ColorSchemeName) => {
	return StyleSheet.create({
		scrollView: {
			padding: Sizes.padding.large,
			backgroundColor: Colors.light.darkerBackground,
		},
		header: {
			flexDirection: "row",
			alignItems: "center",
			padding: Sizes.padding.normal,

			borderColor: "#ccc",
			borderBottomWidth: 1,
		},
		linkWrapper: {
			color: Colors.light.theme,
			paddingVertical: 4,
			paddingHorizontal: 10,

			borderColor: Colors.light.theme,
			borderRadius: 12,
			borderWidth: 1,
		},
		headerText: {
			flex: 1,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			fontSize: Sizes.text.largest,
			textAlign: "center",
			fontWeight: "bold",
		},
		formSection: {
			backgroundColor: "#fff",
			padding: Sizes.padding.larger,
			borderColor: "#ccc",
			borderWidth: 1,
			borderRadius: 12,
			marginBottom: 24,
		},
		buttonContainer: {
			marginTop: Sizes.margin.larger,
			marginBottom: 24,
		},
		loadingContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			marginTop: Sizes.margin.larger,
			marginBottom: 24,
		},
		loadingText: {
			marginLeft: 10,
			color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
			fontSize: Sizes.text.large,
		},
		sectionHeader: {
			fontSize: Sizes.text.large,
			fontWeight: "bold",
			marginTop: Sizes.margin.large,
			marginBottom: Sizes.margin.large,
		},
		linkText: {
			color: Colors.light.theme,
		},
	});
};
