import React, { useEffect, useState, useCallback } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	ScrollView,
	RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IFetchedAppointments } from "@/util/types";
import AppointmentCard from "@/components/AppointmentCard";
import { Sizes } from "@/constants/Sizes";
import { useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Appointments() {
	const [appointments, setAppointments] = useState<IFetchedAppointments[] | []>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchAppointments = useCallback(async () => {
		try {
			setLoading(true);
			const userData = await AsyncStorage.getItem("userData");
			if (!userData) throw new Error("User not logged in");

			const { _id: userId } = JSON.parse(userData);

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/appointments/patient/${userId}`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch appointments");
			}

			const data: IFetchedAppointments[] = await response.json();
			console.log("Appointments:");
			console.log(JSON.stringify(data, null, 4));

			setAppointments(data);
			setError(null);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			fetchAppointments();
		}, [fetchAppointments])
	);

	const onRefresh = () => {
		setRefreshing(true);
		fetchAppointments();
	};

	if (loading && !refreshing) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#fff",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<ActivityIndicator size="large" color={Colors.light.theme} />
			</View>
		);
	}

	if (error) {
		if (error === "User not logged in") {
			return (
				<View
					style={{
						flex: 1,
						padding: Sizes.padding.normal,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#fff",
					}}
				>
					<Text style={{ fontSize: Sizes.text.larger, fontWeight: "bold" }}>
						Log in to use all features.
					</Text>
				</View>
			);
		}

		return (
			<ScrollView
				style={{
					flexGrow: 1,
					padding: Sizes.padding.normal,
					backgroundColor: "#fff",
				}}
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
				}}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<Text>{error}</Text>
			</ScrollView>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={{ backgroundColor: "#fff" }}
				data={appointments}
				keyExtractor={(item) => item._id.toString()}
				renderItem={({ item }) => (
					<AppointmentCard
						key={item._id}
						_id={item._id}
						fromUser={item.fromUser}
						toDoctor={item.toDoctor}
						serviceRequested={item.serviceRequested}
						date={item.date}
						reason={item.reason}
						status={item.status}
						type={item.type}
						createdAt={item.createdAt}
						updatedAt={item.updatedAt}
					/>
				)}
				ListEmptyComponent={<Text>No appointments found.</Text>}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			/>
		</View>
	);
}
