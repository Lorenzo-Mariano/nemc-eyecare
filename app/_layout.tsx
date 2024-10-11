import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router/stack";

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
