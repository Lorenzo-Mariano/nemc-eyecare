import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Image } from "expo-image";

export default function index() {
	const [waifus, setWaifus] = useState([]);

	useEffect(() => {
		const fetchWaifus = async () => {
			try {
				const response = await fetch(
					"https://api.nekosapi.com/v3/images/random?rating=safe&limit=10&tag=1&tag=2"
				);
				const data = await response.json();
				setWaifus(data.items);
				console.log(data.items);
			} catch (error) {
				console.error("Failed to fetch waifus:", error);
			}
		};
		fetchWaifus();
	}, []);

	return (
		<ScrollView>
			{/* each waifu in waifus has waifu.image_url property.
				render each image please.
			*/}
			{waifus.length > 0 ? (
				waifus.map((waifu, index) => (
					<View key={index}>
						<Image
							style={{
								height: waifu.image_height,
							}}
							contentFit="contain"
							source={{
								uri: waifu.image_url,
							}}
						/>
						{/* <Image
							source={{ uri: waifu.image_url }}
							// style={styles.image}
							height={waifu.image_height}
							width={waifu.image_width}
							resizeMode="cover"
						/> */}
					</View>
				))
			) : (
				<Text>Loading waifus...</Text>
			)}
		</ScrollView>
	);
}
