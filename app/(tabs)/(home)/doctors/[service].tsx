import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { IDoctor, IFetchDoctorsResponse, IService } from "@/util/types";
import DoctorCard from "@/components/DoctorCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Sizes } from "@/constants/Sizes";
import { useAuth } from "@/components/context/AuthContext";

export default function Service() {
	const { service } = useLocalSearchParams<{ service: string }>();
	const [doctors, setDoctors] = useState<null | IDoctor[]>();
	const [searchedService, setSearchedService] = useState<null | IService>();
	const [fetching, setFetching] = useState(false);
	const { isLoggedIn } = useAuth();

	async function fetchDoctors() {
		setFetching(true);
		try {
			console.log("The current service selected:", service);
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/doctors/${service}`
			);
			const data: IFetchDoctorsResponse = await response.json();

			// console.log("Fetch results:", JSON.stringify(data, null, 2));
			setDoctors(data.doctors);
			setSearchedService(data.service);
		} catch (error) {
			console.error("Error fetching doctors:", error);
		} finally {
			setFetching(false);
		}
	}

	useFocusEffect(
		React.useCallback(() => {
			if (service) {
				fetchDoctors();
			}
		}, [])
	);

	const renderItem = ({ item }: { item: IDoctor }) => (
		<DoctorCard
			_id={item._id}
			firstName={item.firstName}
			middleName={item.middleName}
			lastName={item.lastName}
			gender={item.gender}
			specialization={item.specialization}
			servicesProvided={item.servicesProvided}
			service={service}
			isLoggedIn={isLoggedIn}
		/>
	);

	if (fetching) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#fff",
				}}
			>
				<Text style={{ fontSize: Sizes.text.largest, fontWeight: "bold" }}>
					Loading...
				</Text>
			</View>
		);
	}

	if (doctors && doctors.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#fff",
				}}
			>
				<Text>No doctors found for this service.</Text>
			</View>
		);
	}

	if (doctors && doctors.length > 0) {
		return (
			<FlatList
				ListHeaderComponent={() => (
					<Text style={styles.listHeader}>
						Displaying {doctors.length} results for doctors that provide{" "}
						{searchedService?.name}
					</Text>
				)}
				data={doctors}
				keyExtractor={(item) => item._id}
				renderItem={renderItem}
				contentContainerStyle={styles.page}
				ListEmptyComponent={<Text>No doctors available.</Text>}
			/>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#fff",
			}}
		>
			<Text>
				Something went wrong. Check your connection and reload the page.
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		gap: Sizes.margin.normal,
		padding: Sizes.padding.large,
	},

	listHeader: {
		backgroundColor: "#fff",
		padding: Sizes.padding.normal,
		borderRadius: 8,
		elevation: 6,
	},
});
