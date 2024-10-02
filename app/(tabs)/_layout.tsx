import { Tabs } from "expo-router";
import {
	Calendar,
	HomeHospital,
	IconoirProvider,
	Mail,
} from "iconoir-react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { getHeaderTitle } from "@react-navigation/elements";
import Header from "@/components/Header";

export default function TabLayout() {
	const scheme = useColorScheme();

	return (
		<IconoirProvider
			iconProps={{
				color: scheme === "dark" ? Colors.dark.icon : Colors.light.icon,
				height: 26,
				width: 26,
			}}
		>
			<Tabs
				screenOptions={{
					header: ({ navigation, route, options }) => {
						const title = getHeaderTitle(options, route.name);
						return <Header title={title} />;
					},
					tabBarActiveTintColor:
						scheme === "dark" ? Colors.dark.theme : Colors.light.theme,
					tabBarShowLabel: false,
					tabBarStyle: {
						backgroundColor:
							scheme === "dark"
								? Colors.dark.background
								: Colors.light.background,
					},
				}}
				backBehavior="history"
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color }) => <HomeHospital color={color} />,
					}}
				/>
				<Tabs.Screen
					name="appointments"
					options={{
						title: "Appointments",
						tabBarIcon: ({ color }) => <Calendar color={color} />,
					}}
				/>
				<Tabs.Screen
					name="messages"
					options={{
						title: "Messages",
						tabBarIcon: ({ color }) => <Mail color={color} />,
					}}
				/>
			</Tabs>
		</IconoirProvider>
	);
}
