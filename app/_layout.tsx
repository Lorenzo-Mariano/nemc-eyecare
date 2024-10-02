import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
	return (
		<GestureHandlerRootView>
			<Drawer>
				<Drawer.Screen name="(tabs)" />
			</Drawer>
		</GestureHandlerRootView>
	);
}

// import { Stack } from "expo-router";

// export default function RootLayout() {
// 	return (
// 		<Stack>
// 			<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
// 		</Stack>
// 	);
// }
