import { useState } from 'react';

import {
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [imagesToUpload, setImagesToUpload] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="Open ExpoImagePicker"
        onPress={async () => {
          // reset images
          setImagesToUpload([]);

          const imagesResult = await launchImageLibraryAsync({
            selectionLimit: 20,
            allowsMultipleSelection: true,
            orderedSelection: true,
            mediaTypes: MediaTypeOptions.Images,
          });

          if (imagesResult.canceled || imagesResult.assets.length === 0) {
            return;
          }

          setImagesToUpload(imagesResult.assets.map((asset) => asset.uri));
        }}
      />
      <Button
        title="Open RNImagePicker"
        onPress={async () => {
          // reset images
          setImagesToUpload([]);

          const imagesResult = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 20,
          });

          const imagesUris = imagesResult.assets
            ?.map((asset) => asset.uri)
            .filter((uri: string | undefined): uri is string => !!uri);

          if (!imagesUris) return;

          setImagesToUpload(imagesUris);
        }}
      />
      {imagesToUpload.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {imagesToUpload.map((imageUri) => (
            <Image
              key={imageUri}
              source={{ uri: imageUri }}
              height={80}
              width={80}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
