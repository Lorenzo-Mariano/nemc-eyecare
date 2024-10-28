import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { IDoctor } from "@/util/types";
import { Image } from "expo-image";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

const DoctorCard = ({
	_id,
	firstName,
	middleName,
	lastName,
	gender,
	specialization,
	service,
	isLoggedIn,
}: IDoctor & { service: string; isLoggedIn: boolean }) => {
	const title = gender === "male" ? "Dr." : "Dra.";
	const middleInitial = middleName ? ` ${middleName}.` : "";

	return (
		<View style={styles.wrapper}>
			<Image
				style={styles.profilePicture}
				source={
					gender === "male"
						? require("@/assets/images/doctor/male.png")
						: require("@/assets/images/doctor/female.png")
				}
				contentFit="scale-down"
			/>
			<View>
				<Text
					style={styles.name}
				>{`${title} ${firstName}${middleInitial} ${lastName}`}</Text>
				<Text style={styles.specialization}>
					{specialization === "General Ophthalmologist"
						? `${specialization}`
						: `${specialization} Specialist`}
				</Text>
			</View>
			<TouchableOpacity
				style={{
					width: "100%",
					padding: Sizes.padding.large,
					borderColor: Colors.light.theme,
					borderWidth: 1,
					borderRadius: 8,
				}}
			>
				{isLoggedIn ? (
					<Link
						href={`/(tabs)/(home)/appointment-form/${_id}?service=${service}`}
						style={{
							textAlign: "center",
							fontWeight: "bold",
							color: Colors.light.theme,
						}}
					>
						Request an appointment
					</Link>
				) : (
					<TouchableOpacity>
						<Text
							style={{
								fontWeight: "bold",
								color: Colors.light.theme,
								textAlign: "center",
							}}
						>
							Log in to request an appointment.
						</Text>
					</TouchableOpacity>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default DoctorCard;

const styles = StyleSheet.create({
	wrapper: {
		alignItems: "center",
		backgroundColor: "#fff",
		padding: Sizes.padding.normal,
		gap: Sizes.margin.large,
		borderRadius: 8,
		elevation: 6,
	},

	profilePicture: {
		height: 150,
		width: "30%",
		padding: 24,
	},

	name: {
		textAlign: "center",
		fontSize: Sizes.text.larger,
		fontWeight: "bold",
	},

	specialization: {
		textAlign: "center",
	},
});
