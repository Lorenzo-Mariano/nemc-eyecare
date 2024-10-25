import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { IDoctor, IFetchDoctorsResponse, IService } from "@/types";
import DoctorCard from "@/components/DoctorCard";
import { Sizes } from "@/constants/Sizes";

export default function Service() {
	const { service } = useLocalSearchParams<{ service: string }>();
	const [doctors, setDoctors] = useState<null | IDoctor[]>();
	const [searchedService, setSearchedService] = useState<null | IService>();
	const [fetching, setFetching] = useState(false);

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

	const renderItem = ({ item }: { item: IDoctor }) => (
		<DoctorCard
			_id={item._id}
			firstName={item.firstName}
			middleName={item.middleName}
			lastName={item.lastName}
			gender={item.gender}
			specialization={item.specialization}
			servicesProvided={item.servicesProvided}
		/>
	);

	useEffect(() => {
		if (service) {
			fetchDoctors();
		}
	}, [service]);

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
		return <Text>No doctors found for this service.</Text>;
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
		<View>
			<Text>Something went wrong...</Text>
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
