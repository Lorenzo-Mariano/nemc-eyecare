import { AuthProvider } from "@/components/context/AuthContext";
import { Stack } from "expo-router/stack";

export default function Layout() {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</AuthProvider>
	);
}
