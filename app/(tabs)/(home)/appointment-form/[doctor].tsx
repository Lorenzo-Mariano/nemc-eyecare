import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { IDoctor } from "@/types";
import { Image } from "expo-image";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarCheck } from "iconoir-react-native";

export default function AppointmentForm() {
	const { doctor: doctorId } = useLocalSearchParams<{ doctor: string }>();

	const [fetching, setFetching] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [doctor, setDoctor] = useState<IDoctor | null>(null);
	const [appointmentDate, setAppointmentDate] = useState<Date | null>(
		new Date()
	);
	const [reason, setReason] = useState("");

	async function fetchDoctor() {
		if (!doctorId) return;

		setFetching(true);
		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/doctors/id/${doctorId}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch doctor information.");
			}
			const data = await response.json();
			setDoctor(data.doctor);
		} catch (error) {
			console.error("Error fetching doctor:", error);
		} finally {
			setFetching(false);
		}
	}

	async function submitAppointmentRequest() {
		if (!appointmentDate || !reason) {
			console.log("Please fill out both the date and reason fields.");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/appointments/doctor/${doctorId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						date: appointmentDate.toISOString().slice(0, 10),
						reason,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to submit the appointment request.");
			}

			console.log("Appointment request submitted successfully.");
		} catch (error) {
			console.error("Error submitting appointment request:", error);
		}
	}

	useEffect(() => {
		fetchDoctor();
	}, [doctorId]);

	const handleDateChange = (_: any, selectedDate: Date | undefined) => {
		setShowDatePicker(false);
		if (selectedDate) {
			setAppointmentDate(selectedDate);
		}
	};

	if (fetching) {
		return (
			<View style={styles.center}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (!doctor) {
		return (
			<View style={styles.center}>
				<Text>No doctor found...</Text>
			</View>
		);
	}

	const title = doctor.gender === "male" ? "Dr." : "Dra.";
	const middleInitial = doctor.middleName ? ` ${doctor.middleName}.` : "";
	const doctorImage =
		doctor.gender === "male"
			? require("@/assets/images/doctor/male.png")
			: require("@/assets/images/doctor/female.png");

	return (
		<ScrollView style={styles.page}>
			<View style={styles.wrapper}>
				<Image
					style={styles.profilePicture}
					contentFit="scale-down"
					source={doctorImage}
				/>
				<View>
					<Text
						style={styles.name}
					>{`${title} ${doctor.firstName}${middleInitial} ${doctor.lastName}`}</Text>
					<Text style={styles.specialization}>
						{doctor.specialization === "General Ophthalmologist"
							? `${doctor.specialization}`
							: `${doctor.specialization} Specialist`}
					</Text>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.label}>Appointment Date</Text>
				<View style={styles.dateContainer}>
					<View style={styles.dateDisplay}>
						<Text>
							{appointmentDate
								? appointmentDate.toISOString().slice(0, 10)
								: "YYYY-MM-DD"}
						</Text>
					</View>
					<TouchableOpacity
						style={styles.selectButton}
						onPress={() => setShowDatePicker(true)}
					>
						<CalendarCheck color={Colors.light.theme} />
					</TouchableOpacity>
				</View>
				{showDatePicker && (
					<DateTimePicker
						value={appointmentDate || new Date()}
						mode="date"
						display="default"
						onChange={handleDateChange}
					/>
				)}
				<Text style={styles.label}>Reason for Appointment</Text>
				<TextInput
					style={[styles.input, styles.textArea]}
					placeholder="Describe your symptoms or reason for the appointment"
					value={reason}
					onChangeText={setReason}
					multiline
					numberOfLines={4}
				/>
				<TouchableOpacity
					style={{
						width: "100%",
						padding: Sizes.padding.large,
						borderColor: Colors.light.theme,
						borderWidth: 1,
						borderRadius: 8,
					}}
					onPress={() => {
						console.log("Form data:", { appointmentDate, reason });
						submitAppointmentRequest();
					}}
				>
					<Text
						style={{
							textAlign: "center",
							fontWeight: "bold",
							color: Colors.light.theme,
						}}
					>
						Send Appointment Request
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		// padding: Sizes.padding.normal,
	},

	wrapper: {
		backgroundColor: "#fff",
		padding: Sizes.padding.normal,
		margin: Sizes.margin.normal,

		borderRadius: 8,
		elevation: 6,
		marginBottom: Sizes.padding.large,
	},

	profilePicture: {
		width: "30%",
		height: 150,
		alignSelf: "center",
	},

	name: {
		fontWeight: "bold",
		fontSize: Sizes.text.large,
		textAlign: "center",
	},

	specialization: {
		textAlign: "center",
		color: Colors.light.text,
		marginBottom: Sizes.padding.small,
	},

	form: {
		backgroundColor: "#fff",
		padding: Sizes.padding.normal,
		margin: Sizes.margin.normal,
		borderRadius: 8,
		elevation: 6,
		marginTop: Sizes.padding.normal,
	},

	label: {
		flex: 3,
		fontSize: Sizes.text.normal,
		fontWeight: "bold",
		marginBottom: Sizes.padding.small,
	},

	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: Sizes.padding.small,
		borderRadius: 8,
		marginBottom: Sizes.padding.normal,
	},

	textArea: {
		height: 100,
		textAlignVertical: "top",
	},

	center: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},

	dateContainer: {
		flexDirection: "row",
		gap: Sizes.margin.normal,
		marginBottom: Sizes.margin.large,
	},

	dateDisplay: {
		flex: 1,
		padding: Sizes.padding.small,
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},

	selectButton: {
		padding: Sizes.padding.normal,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: Colors.light.theme,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
});
