import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabKey = "home" | "bookmark" | "mybook";

const navIconMap: Record<
  TabKey,
  { default: ImageSourcePropType; active: ImageSourcePropType }
> = {
  home: {
    default: require("../images/icon_home.png"),
    active: require("../images/icon_home_actived.png"),
  },
  bookmark: {
    default: require("../images/icon_nav_bookmark.png"),
    active: require("../images/icon_nav_bookmark_actived.png"),
  },
  mybook: {
    default: require("../images/icon_mybook.png"),
    active: require("../images/icon_mybook_actived.png"),
  },
};

export default function BlankScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [isTopBookmarked, setIsTopBookmarked] = useState(false);
  const navHitSlop = 10;

  const handleNavPress = (tab: TabKey) => {
    setActiveTab(tab);
    if (tab === "home") {
      router.push("/");
    }
  };

  const getNavIconSource = (tab: TabKey) => {
    return activeTab === tab ? navIconMap[tab].active : navIconMap[tab].default;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topNavBar, { paddingTop: insets.top }]}>
        <View style={styles.topNavInner}>
          <Pressable
            style={({ pressed }) => [styles.topNavButton, pressed && styles.topNavButtonPressed]}
            onPress={() => router.back()}
          >
            <Image source={require("../images/icon_back.png")} style={styles.topNavIcon} />
          </Pressable>
          <View style={styles.topNavSpacer} />
          <Pressable
            style={({ pressed }) => [styles.topNavButton, pressed && styles.topNavButtonPressed]}
            onPress={() => setIsTopBookmarked((prev) => !prev)}
          >
            <Image
              source={
                isTopBookmarked
                  ? require("../images/icon_bookmark_actived.png")
                  : require("../images/icon_bookmark.png")
              }
              style={styles.topNavIcon}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Image source={require("../images/4.png")} style={styles.middleBookImage} />
        <View style={styles.bookDetailContainer}>
          <View style={styles.nameContainer} />
          <View style={styles.explainContainer} />
        </View>
      </View>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable
          style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
          onPress={() => handleNavPress("home")}
          hitSlop={navHitSlop}
        >
          <Image source={getNavIconSource("home")} style={styles.navIcon} />
          <Text style={[styles.navLabel, activeTab === "home" && styles.navLabelActive]}>Home</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
          onPress={() => handleNavPress("bookmark")}
          hitSlop={navHitSlop}
        >
          <Image source={getNavIconSource("bookmark")} style={styles.navIcon} />
          <Text style={[styles.navLabel, activeTab === "bookmark" && styles.navLabelActive]}>
            Wishlist
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
          onPress={() => handleNavPress("mybook")}
          hitSlop={navHitSlop}
        >
          <Image source={getNavIconSource("mybook")} style={styles.navIcon} />
          <Text style={[styles.navLabel, activeTab === "mybook" && styles.navLabelActive]}>
            My books
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topNavBar: {
    backgroundColor: "#ffffff",
  },
  topNavInner: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  topNavButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  topNavButtonPressed: {
    opacity: 0.9,
  },
  topNavSpacer: {
    flex: 1,
  },
  topNavIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  middleContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  middleBookImage: {
    width: 210,
    height: 300,
    marginTop: 8,
    marginHorizontal: 75,
    resizeMode: "contain",
  },
  bookDetailContainer: {
    //底下的container 黑色區塊
    marginTop: 28,
    marginHorizontal: 20,
    height: 164,
    alignSelf: "stretch",
    backgroundColor: "#000000",
    justifyContent: "flex-end",
  },
  explainContainer: {
    //底下的解釋區域 綠色區塊
    height: 72,
    backgroundColor: "#00aa00",
  },
  nameContainer: {
    //底下的名稱區域 紫色區塊
    height: 76,
    marginBottom: 16,
    backgroundColor: "#6a00ff",
  },
  bottomBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    backgroundColor: "#ffffff",
    paddingTop: 14,
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
  navItem: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  navItemPressed: {
    opacity: 0.9,
  },
  navIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  navLabel: {
    marginTop: 4,
    fontSize: 16,
    color: "#777777",
  },
  navLabelActive: {
    color: "#5a30d6",
    fontWeight: "600",
  },
});
