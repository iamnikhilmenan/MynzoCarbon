import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function BookmarkScreen() {
  const isFocused = useIsFocused();
  const [prevBookmark, setPrevBookmark] = useState([]);

  // :: GET BOOKMARK DATA FROM ASYNC STORAGE
  const getBookmarkData = async () => {
    try {
      const prevBookmark = await AsyncStorage.getItem("bookmarks");
      prevBookmark != null ? setPrevBookmark(JSON.parse(prevBookmark)) : null;
    } catch (e) {
      console.log("error===>", e.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getBookmarkData();
    }
  }, [isFocused]);

  // :: ON READ MORE BUTTON
  const onReadMoreButton = async (url) => {
    const supported = await Linking.canOpenURL(url);
    supported
      ? Linking.openURL(url)
      : Alert.alert(
          "Unable to open the complete blog...",
          "url not supported",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.screenTitle}>Saved Bookmarks</Text>
        <View style={styles.divider} />

        <FlatList
          data={prevBookmark}
          contentContainerStyle={{ width: width }}
          renderItem={({ item, index }) => (
            <>
              <View style={styles.listContainer} key={index.toString()}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: `${item.urlToImage}` }}
                    style={styles.image}
                  />
                  <View>
                    <Text>{item.source.name}</Text>
                    {/* <Text>{item.title}</Text> */}
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: 4,
                    overflow: "hidden",
                    borderRadius: 100,
                    width: 100,
                  }}
                >
                  <Button
                    title="read"
                    onPress={() => onReadMoreButton(item.url)}
                    color="green"
                  />
                </View>
              </View>
            </>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  divider: {
    width: width,
    height: 0.5,
    backgroundColor: "black",
    marginVertical: 12,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 12,
  },
});
