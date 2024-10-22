import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Service() {
	const { service } = useLocalSearchParams<{ service: string }>();
	const [doctors, setDoctors] = useState([]);
	const [fetching, setFetching] = useState(false);

	async function fetchDoctors() {
		setFetching(true);
		try {
			console.log("The current service selected:", service);
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/doctors/${service}`
			);
			const data = await response.json();
			setDoctors(data);
		} catch (error) {
			console.error("Error fetching doctors:", error);
		} finally {
			setFetching(false);
		}
	}

	useEffect(() => {
		if (service) {
			fetchDoctors();
		}
	}, [service]);

	return (
		<View>
			<Text>Show the doctors that offer the service: {service}</Text>
			{/* Map over the doctors and display them */}
			{/* {doctors.map((doctor, index) => (
				<Text key={index}>{doctor.name}</Text>
			))} */}
		</View>
	);
}
