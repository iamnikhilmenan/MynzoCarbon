import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import Screen from "./src/HomeScreen";
import BottomBarNavigation from "./navigation/BottomBarNavigation";

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <BottomBarNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
  },
});
