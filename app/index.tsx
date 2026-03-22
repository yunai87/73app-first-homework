import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabKey = "home" | "bookmark" | "mybook";
type TopNavAction = "menu" | "search";

const HAMBURGER_WIDTH = Math.min(Dimensions.get("window").width * 0.78, 320);

const HAMBURGERMenuItems: Array<{
  key: string;
  label: string;
  icon: ImageSourcePropType;
}> = [
  {
    key: "home",
    label: "Home",
    icon: require("../images/icon_home.png"),
  },
  {
    key: "account",
    label: "Account",
    icon: require("../images/icon_account.png"),
  },
  {
    key: "setting",
    label: "Setting",
    icon: require("../images/icon_settings.png"),
  },
];

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

const popularBooks: Array<{
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
}> = [
  {
    id: "book-1",
    title: "Fashionopolis",
    author: "Dana Thomas",
    cover: require("../images/1.png"),
  },
  {
    id: "book-2",
    title: "Chanel",
    author: "Patrick Mauries",
    cover: require("../images/2.png"),
  },
  {
    id: "book-3",
    title: "Calligraphy",
    author: "June & Lucy",
    cover: require("../images/3.png"),
  },
];

const newestBooks: Array<{
  id: string;
  title: string;
  author: string;
  cover: ImageSourcePropType;
  rating: number;
}> = [
  {
    id: "new-book-1",
    title: "Yves Saint Laurent",
    author: "Suzy Menkes",
    cover: require("../images/4.png"),
    rating: 4,
  },
  {
    id: "new-book-2",
    title: "The Book of Signs",
    author: "Rudolf Koch",
    cover: require("../images/5.png"),
    rating: 3,
  },
  {
    id: "new-book-3",
    title: "Stitched Up",
    author: "Tansy E. Hoskins",
    cover: require("../images/6.png"),
    rating: 3,
  },
];

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [isHAMBURGERVisible, setIsHAMBURGERVisible] = useState(false);
  const HAMBURGERTranslateX = useRef(new Animated.Value(-HAMBURGER_WIDTH)).current;
  const navHitSlop = 10;

  const openHAMBURGER = () => {
    setIsHAMBURGERVisible(true);
    HAMBURGERTranslateX.setValue(-HAMBURGER_WIDTH);
    Animated.timing(HAMBURGERTranslateX, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const closeHAMBURGER = () => {
    Animated.timing(HAMBURGERTranslateX, {
      toValue: -HAMBURGER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsHAMBURGERVisible(false);
      }
    });
  };

  const handleNavPress = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const handleTopNavPress = (action: TopNavAction) => {
    if (action === "menu") {
      openHAMBURGER();
      return;
    }

    return;
  };

  const getNavIconSource = (tab: TabKey) => {
    return activeTab === tab ? navIconMap[tab].active : navIconMap[tab].default;
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={isHAMBURGERVisible}
        animationType="none"
        onRequestClose={closeHAMBURGER}
      >
        <View style={styles.HAMBURGERModalRoot}>
          <Pressable style={styles.HAMBURGEROverlay} onPress={closeHAMBURGER} />
          <Animated.View
            style={[
              styles.HAMBURGERPanel,
              {
                paddingTop: insets.top + 24,
                transform: [{ translateX: HAMBURGERTranslateX }],
              },
            ]}
          >
            <View style={styles.HAMBURGERProfileSection}>
              <Image source={require("../images/May.jpg")} style={styles.HAMBURGERAvatar} />
              <Text style={styles.HAMBURGERName}>May</Text>
            </View>
            <View style={styles.HAMBURGERMenuSection}>
              {HAMBURGERMenuItems.map((item) => (
                <Pressable
                  key={item.key}
                  style={({ pressed }) => [
                    styles.HAMBURGERMenuItem,
                    pressed && styles.HAMBURGERMenuItemPressed,
                  ]}
                  onPress={closeHAMBURGER}
                >
                  <Image source={item.icon} style={styles.HAMBURGERMenuIcon} />
                  <Text style={styles.HAMBURGERMenuLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>

      <View style={[styles.topNavBar, { paddingTop: insets.top }]}>
        <View style={styles.topNavInner}>
          <Pressable
            style={({ pressed }) => [styles.topNavButton, pressed && styles.topNavButtonPressed]}
            onPress={() => handleTopNavPress("menu")}
          >
            <Image source={require("../images/icon_menu.png")} style={styles.topNavIcon} />
          </Pressable>
          <View style={styles.topNavSpacer} />
          <Pressable
            style={({ pressed }) => [styles.topNavButton, pressed && styles.topNavButtonPressed]}
            onPress={() => handleTopNavPress("search")}
          >
            <Image source={require("../images/icon_search.png")} style={styles.topNavIcon} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.middleContainer}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom + 96, 120) },
        ]}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
          <View style={styles.textBox_1}>
            <Text style={styles.title}>Popular Books</Text>
          </View>
          <View style={styles.bookcontainer_1}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookListContent}
            >
              {popularBooks.map((book, index) => (
                <View
                  key={book.id}
                  style={[styles.bookCard, index === popularBooks.length - 1 && styles.bookCardLast]}
                >
                  <Image source={book.cover} style={styles.bookCover} />
                  <Text style={styles.bookTitle_1} numberOfLines={1}>
                    {book.title}
                  </Text>
                  <Text style={styles.bookAuthor} numberOfLines={1}>
                    {book.author}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.textBox_2}>
            <Text style={styles.title}>Newest</Text>
          </View>
          <View style={styles.bookcontainer_2}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookListContent}
            >
              {newestBooks.map((book, index) => (
                <Pressable
                  key={book.id}
                  onPress={index === 0 ? () => router.push("/pinkbook") : undefined}
                  disabled={index !== 0}
                  style={[styles.bookCard, index === newestBooks.length - 1 && styles.bookCardLast]}
                >
                  <Image source={book.cover} style={styles.bookCover} />
                  <View style={styles.starContainer}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Image
                        key={`${book.id}-newest-star-${starIndex}`}
                        source={
                          starIndex < book.rating
                            ? require("../images/icon_star_filled.png")
                            : require("../images/icon_star_empty.png")
                        }
                        style={styles.starIcon}
                      />
                    ))}
                  </View>
                  <Text style={styles.bookTitle_2} numberOfLines={1}>
                    {book.title}
                  </Text>
                  <Text style={styles.bookAuthor} numberOfLines={1}>
                    {book.author}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
      </ScrollView>

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
    zIndex: 1,
  },
  topNavInner: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomColor: "#dddddd",
  },
  topNavButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  topNavButtonPressed: {
    opacity: 0.6,
  },
  topNavSpacer: {
    flex: 1,
  },
  topNavIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  HAMBURGERModalRoot: {
    flex: 1,
  },
  HAMBURGEROverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  HAMBURGERPanel: {
    width: HAMBURGER_WIDTH,
    height: "100%",
    backgroundColor: "#ffffff",
    borderRightWidth: 1,
    borderRightColor: "#e4e4e4",
  },
  HAMBURGERProfileSection: {
    height: 190,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  HAMBURGERAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  HAMBURGERName: {
    marginTop: 18,
    fontSize: 24,
    color: "#1f1f1f",
    fontWeight: "600",
    lineHeight: 28,
  },
  HAMBURGERMenuSection: {
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    paddingVertical: 10,
  },
  HAMBURGERMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 22,
    gap: 18,
  },
  HAMBURGERMenuItemPressed: {
    opacity: 0.6,
  },
  HAMBURGERMenuIcon: {
    width: 24,
    height: 56,
    resizeMode: "contain",
    opacity: 0.58,
  },
  HAMBURGERMenuLabel: {
    fontSize: 24,
    color: "#6e6e6e",
    fontWeight: "500",
    lineHeight: 36,
  },
  middleContainer: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    alignItems: "stretch",
    gap: 16,
  },
  textBox_1: {
    marginHorizontal: 20,
  },
  textBox_2: {
    marginHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily:"Roboto",
    color: "#333333",
  },
  bookcontainer_1: {
    height: 270,
  },
  bookListContent: {
    paddingHorizontal: 20,
  },
  bookCard: {
    width: 140,
    height: 270,
    borderRadius: 8,
    marginRight: 16,
  },
  bookCardLast: {
    marginRight: 0,
  },
  bookCover: {
    width: "100%",
    height: 200,
    borderRadius: 6,
  },
  bookTitle_1: {
    lineHeight: 18,
    height: 18,
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#131313",
  },
  bookTitle_2: {
    lineHeight: 18,
    height: 18,
    marginTop: 0,
    fontSize: 16,
    fontWeight: "500",
    color: "#131313",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    height: 14,
    gap: 4,
  },
  starIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  bookAuthor: {
    lineHeight: 15,
    height: 15,
    marginTop: 8,
    fontSize: 12,
    opacity: 0.5,
    color: "#131313",
    fontWeight: "500",
  },
  bookcontainer_2: {
    height: 279
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

