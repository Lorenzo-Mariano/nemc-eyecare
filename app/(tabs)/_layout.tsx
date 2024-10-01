import { Tabs } from "expo-router";
import {
	Calendar,
	HomeHospital,
	IconoirProvider,
	Mail,
} from "iconoir-react-native";

export default function TabLayout() {
	return (
		<IconoirProvider
			iconProps={{
				height: 26,
				width: 26,
			}}
		>
			<Tabs screenOptions={{ tabBarActiveTintColor: "#165c91" }}>
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
