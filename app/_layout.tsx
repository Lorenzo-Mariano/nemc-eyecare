import { Stack } from "expo-router";
import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				header: () => (
					<View>
						<Text>Hello world!</Text>
					</View>
				),
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
