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

export default function Index() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const navHitSlop = 10;

  const handleNavPress = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const getNavIconSource = (tab: TabKey) => {
    return activeTab === tab ? navIconMap[tab].active : navIconMap[tab].default;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>首頁內容區</Text>
      </View>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Pressable
          style={styles.navItem}
          onPress={() => handleNavPress("home")}
          hitSlop={navHitSlop}
        >
          <Image source={getNavIconSource("home")} style={styles.navIcon} />
          <Text style={[styles.navLabel, activeTab === "home" && styles.navLabelActive]}>Home</Text>
        </Pressable>
        <Pressable
          style={styles.navItem}
          onPress={() => handleNavPress("bookmark")}
          hitSlop={navHitSlop}
        >
          <Image source={getNavIconSource("bookmark")} style={styles.navIcon} />
          <Text style={[styles.navLabel, activeTab === "bookmark" && styles.navLabelActive]}>
            Wishlist
          </Text>
        </Pressable>
        <Pressable
          style={styles.navItem}
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
    backgroundColor: "#f7f7f7",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222222",
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
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  navLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#777777",
  },
  navLabelActive: {
    color: "#5a30d6",
    fontWeight: "600",
  },
});
