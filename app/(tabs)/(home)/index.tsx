import React from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { services } from "@/constants/Services";
import { Search } from "iconoir-react-native";
import { Link } from "expo-router";

export default function Index() {
	const scheme = useColorScheme();

	const renderServiceItem = ({
		item,
	}: {
		item: { name: string; src: string; description: string };
	}) => {
		return (
			<View style={styles.card}>
				<Image source={item.src} style={styles.image} contentFit="cover" />
				<View style={styles.info}>
					<Text
						style={[
							styles.name,
							{
								color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
							},
						]}
					>
						{item.name}
					</Text>
					<Text
						style={[
							styles.description,
							{
								color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
							},
						]}
					>
						{item.description}
					</Text>
					<TouchableOpacity style={styles.findDoctorBtn}>
						<Link
							href={"/(tabs)/(home)/doctors/service-name"}
							style={{ color: Colors.light.theme }}
						>
							Find a Doctor
						</Link>
						<Search color={Colors.light.theme} height={16} />
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<FlatList
			data={services}
			renderItem={renderServiceItem}
			keyExtractor={(item) => item.name}
			contentContainerStyle={styles.container}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: Sizes.padding.normal,
	},
	columnWrapper: {
		justifyContent: "space-between",
		gap: Sizes.margin.small,
	},
	card: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		overflow: "hidden",

		borderColor: "#ddd",
		borderRadius: 8,
		borderWidth: 1,

		marginBottom: Sizes.margin.small,
	},
	image: {
		width: 160,
		height: "100%",
	},
	info: {
		flex: 1,
		gap: Sizes.margin.large,
		padding: Sizes.padding.larger,
		width: "100%",
		backgroundColor: "#fff",
	},
	name: {
		fontSize: Sizes.text.large,
		fontWeight: "bold",
		marginBottom: 4,
	},
	description: {
		fontSize: Sizes.text.normal,
	},

	findDoctorBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderColor: Colors.light.theme,
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
	},
});
