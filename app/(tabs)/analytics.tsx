import {
	View,
	Text,
	Dimensions,
	ScrollView,
	RefreshControl,
	StyleSheet,
	FlatList,
	SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Sizes } from "@/constants/Sizes";
import { IAnalytics } from "@/util/types";

const screenWidth = Dimensions.get("window").width;

export default function Analytics() {
	const [analyticsData, setAnalyticsData] = useState<IAnalytics | null>(null);
	const [refreshing, setRefreshing] = useState(false);

	const time = Date.parse(new Date().toString());
	const analyticsUrl = `${process.env.EXPO_PUBLIC_DEV_API}/analytics/${time}`;
	const fetchAnalytics = async () => {
		const response = await fetch(analyticsUrl);
		const { analytics } = await response.json();
		setAnalyticsData(analytics);
	};

	useEffect(() => {
		fetchAnalytics();
	}, []);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await fetchAnalytics();
		setRefreshing(false);
	}, []);

	if (!analyticsData)
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#fff",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ fontSize: Sizes.text.large, fontWeight: "bold" }}>
					Loading analytics...
				</Text>
			</View>
		);

	const statusData = [
		{
			name: "Accepted",
			count: analyticsData.appointments.count.status.accepted,
			color: "#4caf50",
		},
		{
			name: "Closed",
			count: analyticsData.appointments.count.status.closed,
			color: "#ff9800",
		},
		{
			name: "Pending",
			count: analyticsData.appointments.count.status.pending,
			color: "#f44336",
		},
	];
	const barData = {
		labels: ["Accepted", "Closed", "Pending"],
		datasets: [{ data: statusData.map((item) => item.count) }],
	};

	const doctorGenderData = [
		{ name: "Male", count: analyticsData.doctors.count.male, color: "#42a5f5" },
		{
			name: "Female",
			count: analyticsData.doctors.count.female,
			color: "#ff4081",
		},
	];
	const patientGenderData = [
		{
			name: "Male",
			count: analyticsData.users.patients.count.male,
			color: "#42a5f5",
		},
		{
			name: "Female",
			count: analyticsData.users.patients.count.female,
			color: "#ff4081",
		},
	];

	const serviceData = {
		labels: [
			"Eye Exam",
			"Cataract",
			"Laser",
			"Eyeglass Fitting",
			"Retinopathy",
			"Glaucoma",
			"Visual Field Test",
			"Ocular Coherence",
			"Fluorescein Angiogram",
		],
		datasets: [
			{
				data: [
					analyticsData.appointments.count.eyeExam || 0,
					analyticsData.appointments.count.cataract || 0,
					analyticsData.appointments.count.laser || 0,
					analyticsData.appointments.count.eyeglassFitting || 0,
					analyticsData.appointments.count.retinopathy || 0,
					analyticsData.appointments.count.glaucoma || 0,
					analyticsData.appointments.count.visualFieldTest || 0,
					analyticsData.appointments.count.ocularCoherence || 0,
					analyticsData.appointments.count.fluoresceinAngiogram || 0,
				],
			},
		],
	};

	const servicePieData = serviceData.labels.map((label, index) => ({
		name: label,
		count: serviceData.datasets[0].data[index],
		color: `#${Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")}`, // Ensures each color is a valid 6-digit hex code
	}));

	const serviceList = [
		{ name: "Eye Exam", count: analyticsData.appointments.count.eyeExam },
		{ name: "Cataract", count: analyticsData.appointments.count.cataract },
		{ name: "Laser", count: analyticsData.appointments.count.laser },
		{
			name: "Eyeglass Fitting",
			count: analyticsData.appointments.count.eyeglassFitting,
		},
		{
			name: "Retinopathy",
			count: analyticsData.appointments.count.retinopathy,
		},
		{ name: "Glaucoma", count: analyticsData.appointments.count.glaucoma },
		{
			name: "Visual Field Test",
			count: analyticsData.appointments.count.visualFieldTest,
		},
		{
			name: "Ocular Coherence",
			count: analyticsData.appointments.count.ocularCoherence,
		},
		{
			name: "Fluorescein Angiogram",
			count: analyticsData.appointments.count.fluoresceinAngiogram,
		},
	];

	return (
		<ScrollView
			style={{ backgroundColor: "#fff", padding: Sizes.padding.large }}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<View style={{ alignItems: "center" }}>
				<Text style={{ fontSize: 18, textAlign: "center", marginVertical: 10 }}>
					Appointment Status Distribution
				</Text>
				<BarChart
					data={barData}
					width={screenWidth - 40}
					showValuesOnTopOfBars={true}
					height={220}
					yAxisLabel=""
					yAxisSuffix=""
					fromZero={true}
					chartConfig={{
						backgroundColor: "#ffffff",
						backgroundGradientFrom: "#e3f2fd",
						backgroundGradientTo: "#e3f2fd",
						color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
						decimalPlaces: 2,
					}}
					style={{ marginVertical: 8, borderRadius: 8 }}
				/>
				<PieChart
					data={statusData.map((item) => ({
						...item,
						legendFontColor: "#333",
						legendFontSize: 14,
					}))}
					width={screenWidth - 40}
					height={220}
					chartConfig={{
						color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
					}}
					accessor="count"
					backgroundColor="transparent"
					paddingLeft="15"
					style={{ marginVertical: 8, borderRadius: 8 }}
				/>
			</View>

			<View>
				<SafeAreaView style={styles.container}>
					<Text style={styles.title}>Appointments by Service Requested</Text>

					{/* Table Headers */}
					<View style={styles.row}>
						<Text style={[styles.cell, styles.header]}>Service</Text>
						<Text style={[styles.cell, styles.header]}>Count</Text>
					</View>

					{/* Table Data */}

					{serviceList.map((service, index) => {
						return (
							<View
								key={Math.random()}
								style={[styles.row, index % 2 === 0 && styles.evenRow]}
							>
								<Text style={styles.cell}>{service.name}</Text>
								<Text style={styles.cell}>{service.count}</Text>
							</View>
						);
					})}
				</SafeAreaView>
				<PieChart
					data={servicePieData.map((item) => ({
						...item,
						legendFontColor: "#333",
						legendFontSize: 12,
					}))}
					width={screenWidth - 30}
					height={170}
					chartConfig={{
						color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
					}}
					accessor="count"
					backgroundColor="transparent"
					paddingLeft="-20"
					style={{ marginVertical: 16, borderRadius: 8 }}
				/>
			</View>
			<View>
				<Text style={{ fontSize: 18, textAlign: "center" }}>
					Doctors' Gender Distribution
				</Text>
				<PieChart
					data={doctorGenderData.map((item) => ({
						name: item.name,
						count: item.count,
						color: item.color,
						legendFontColor: "#333",
						legendFontSize: 14,
					}))}
					width={screenWidth - 40}
					height={220}
					chartConfig={{
						color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
						decimalPlaces: 0,
					}}
					accessor="count"
					backgroundColor="transparent"
					paddingLeft="15"
					style={{ marginVertical: 16, borderRadius: 8 }}
				/>
				{/* Legend for Doctors */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginTop: 10,
						marginBottom: 32,
					}}
				>
					{doctorGenderData.map((item, index) => (
						<View
							key={index}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginHorizontal: 10,
							}}
						>
							<View
								style={{
									width: 15,
									height: 15,
									backgroundColor: item.color,
									marginRight: 5,
								}}
							/>
							<Text style={{ fontSize: 14 }}>{item.name}</Text>
						</View>
					))}
				</View>
			</View>

			{/* Patients' Gender Distribution */}
			<View>
				<Text style={{ fontSize: 18, textAlign: "center", marginVertical: 10 }}>
					Patients' Gender Distribution
				</Text>
				<PieChart
					data={patientGenderData.map((item) => ({
						name: item.name,
						count: item.count,
						color: item.color,
						legendFontColor: "#333",
						legendFontSize: 14,
					}))}
					width={screenWidth - 40}
					height={220}
					chartConfig={{
						color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
						decimalPlaces: 0,
					}}
					accessor="count"
					backgroundColor="transparent"
					paddingLeft="15"
					style={{ marginVertical: 8, borderRadius: 8 }}
				/>
				{/* Legend for Patients */}
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginVertical: 10,
					}}
				>
					{patientGenderData.map((item, index) => (
						<View
							key={index}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginHorizontal: 10,
								marginBottom: 16,
							}}
						>
							<View
								style={{
									width: 15,
									height: 15,
									backgroundColor: item.color,
									marginRight: 5,
								}}
							/>
							<Text style={{ fontSize: 14 }}>{item.name}</Text>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 10,
	},
	row: {
		flexDirection: "row",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: "#ddd",
	},
	cell: {
		flex: 1,
		fontSize: 16,
		textAlign: "center",
	},
	header: {
		fontWeight: "bold",
		backgroundColor: "#e3f2fd",
	},
	evenRow: {
		backgroundColor: "#f9f9f9",
	},
});
