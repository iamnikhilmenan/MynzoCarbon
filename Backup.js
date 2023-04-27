import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  Button,
  ActivityIndicator,
  Linking,
  Alert,
  Share,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const { width, height } = Dimensions.get("window");
const URL =
  "https://newsapi.org/v2/everything?q=tesla&from=2023-03-26&sortBy=publishedAt&apiKey=f3745a8ec0f84fb89821ba1aa2a0053b";

export default function Screen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // :: API CALL
  const getNewsApi = async () => {
    try {
      const data = await axios.get(URL);

      if (data.status === 200) {
        setData(data.data.articles);
        setLoading(false);
        console.log(`Api call successfully`);
      } else {
        console.log(`Api failed`);
      }
    } catch (error) {
      console.log("The error is ", error.message);
    }
  };

  useEffect(() => {
    getNewsApi();
  }, []);

  // :: READ MORE BUTTON HANDLER
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

  // ::ON BOOKMARK BUTTON HANDLER

  // :: ON SHARE BUTTON HANDLER
  const onShareButton = async (url) => {
    try {
      const result = await Share.share({
        message: url,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          pagingEnabled
          renderItem={({ item, index }) => (
            <>
              <View style={{ width: width, height: height }}>
                {/* :: Head of the news letter */}
                <View style={styles.imageContainer}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${item.urlToImage}`,
                      }}
                    />
                  )}
                </View>

                {/* :: Body of the news letter */}
                <View style={styles.contentContainer}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "green",
                          fontSize: 12,
                          paddingHorizontal: 14,
                          paddingVertical: 2,
                          borderRadius: 100,
                          color: "#fff",
                          fontWeight: "bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        {item.source.name}
                      </Text>
                      <Text>{Date.parse(item.publishedAt)}</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#000",
                        textAlign: "auto",
                        textAlign: "justify",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "gray",
                        paddingBottom: 8,
                      }}
                    >
                      <Text style={{ color: "green" }}>Author:-</Text>{" "}
                      {item.author}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "black",
                        textAlign: "justify",
                      }}
                      numberOfLines={18}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginBottom: 24,
                      elevation: 6,
                      backgroundColor: "white",
                    }}
                  >
                    <Button
                      title="Nikhil Menan"
                      onPress={() => onReadMoreButton(item.url)}
                    />
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name="bookmark-plus-outline"
                    size={24}
                    color="black"
                    style={styles.iconStyle}
                    onPress={() => console.log("bookmark")}
                  />
                  <MaterialCommunityIcons
                    name="share"
                    size={24}
                    color="black"
                    style={styles.iconStyle}
                    onPress={() => onShareButton(item.url)}
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
    height: height,
  },
  contentContainer: {
    height: height * 0.6,
    paddingVertical: 28,
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    position: "absolute",
    right: height * 0.04,
    top: height * 0.37,
  },
  iconStyle: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 100,
    marginHorizontal: 6,
    borderWidth: 0.1,
    borderColor: "#000",
    elevation: 6,
  },
  imageContainer: {
    height: height * 0.4,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
