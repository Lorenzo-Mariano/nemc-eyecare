import { View, Text, StyleSheet } from "react-native";
import { IDoctor, IFetchedAppointments } from "@/util/types";
import React from "react";
import { Sizes } from "@/constants/Sizes";
import { services } from "@/constants/Services";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";

export default function AppointmentCard({
	toDoctor,
	date,
	serviceRequested,
	status,
}: IFetchedAppointments) {
	function generateDocName(doctor: IDoctor) {
		return `${doctor.gender === "male" ? "Dr." : "Dra."} ${doctor.firstName} ${
			doctor.middleName ? `${doctor.middleName}. ` : ""
		}${doctor.lastName}`;
	}

	const { src } = services.find(
		(service) => service.tag === serviceRequested.tag
	);

	function capitalizeFirstLetter(word: string) {
		if (!word) return "";
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}

	return (
		<View style={styles(status).card}>
			<Image
				source={src}
				style={styles(status).serviceImg}
				contentFit="cover"
			/>
			<View style={styles(status).details}>
				<Text style={styles(status).service}>{serviceRequested.name}</Text>
				<Text>{generateDocName(toDoctor)}</Text>
				<Text>Scheduled on {new Date(date).toLocaleDateString()}</Text>
				<Text style={styles(status).accepted}>
					{capitalizeFirstLetter(status)}
				</Text>
			</View>
		</View>
	);
}

const styles = (status: "accepted" | "pending" | "closed") => {
	return StyleSheet.create({
		card: {
			flexDirection: "row",
			borderRadius: 8,
			elevation: 6,
			backgroundColor: "#fff",
			marginVertical: 6,
			marginHorizontal: 12,
			overflow: "hidden",
		},

		serviceImg: {
			width: 160,
			height: "100%",
		},

		details: {
			flex: 1,
			padding: Sizes.padding.normal,
		},

		service: {
			fontSize: Sizes.text.large,
			fontWeight: "bold",
			marginBottom: Sizes.margin.normal,
		},

		accepted: {
			color:
				status === "accepted"
					? "green"
					: status === "closed"
					? "#000"
					: Colors.light.theme,
			fontWeight: "bold",
		},
	});
};
