import React, { useState, useCallback, useEffect } from "react";
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	ScrollView,
	RefreshControl,
} from "react-native";
import { IFetchedAppointments } from "@/util/types";
import AppointmentCard from "@/components/AppointmentCard";
import { Sizes } from "@/constants/Sizes";
import { useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/components/context/AuthContext";

export default function Appointments() {
	const { isLoggedIn, user } = useAuth();
	const [appointments, setAppointments] = useState<IFetchedAppointments[] | []>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchAppointments = useCallback(async () => {
		if (!isLoggedIn || !user?._id) return;

		try {
			setLoading(true);

			const response = await fetch(
				`${process.env.EXPO_PUBLIC_DEV_API}/appointments/patient/${user._id}`
			);

			if (!response.ok) {
				throw new Error("You have no appointments.");
			}

			const data: IFetchedAppointments[] = await response.json();
			console.log("Appointments:", JSON.stringify(data, null, 4));

			setAppointments(data);
			setError(null);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, [isLoggedIn, user]);

	useFocusEffect(
		React.useCallback(() => {
			if (isLoggedIn) fetchAppointments();
		}, [isLoggedIn, fetchAppointments])
	);

	const onRefresh = () => {
		setRefreshing(true);
		fetchAppointments();
	};

	useEffect(() => {
		if (!isLoggedIn) {
			setLoading(false);
			setError("User not logged in");
		}
	}, [isLoggedIn]);

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
					padding: Sizes.padding.normal,
					backgroundColor: "#fff",
				}}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<Text style={{ fontSize: Sizes.text.large, fontWeight: "bold" }}>
					{error}
				</Text>
			</ScrollView>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={{ backgroundColor: "#fff" }}
				data={appointments.reverse()}
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
