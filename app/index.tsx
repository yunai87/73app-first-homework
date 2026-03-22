import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabKey = "home" | "bookmark" | "mybook";
type TopNavAction = "menu" | "search";

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

export default function Index() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const navHitSlop = 10;

  const handleNavPress = (tab: TabKey) => {
    setActiveTab(tab);
  };

  const handleTopNavPress = (action: TopNavAction) => {
    if (action === "menu") {
      return;
    }

    return;
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

      <View style={styles.middleContainer}>
        <View style={styles.content}>
          <View style={styles.textBox_1}>
            <Text style={styles.title}>Popular Books</Text>
          </View>
          <View style={styles.bookcontainer_1}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookListContent}
            >
              {popularBooks.map((book, index) => (
                <View
                  key={book.id}
                  style={[styles.bookCard, index === popularBooks.length - 1 && styles.bookCardLast]}
                >
                  <Image source={book.cover} style={styles.bookCover} />
                  <Text style={styles.bookTitle} numberOfLines={1}>
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
            {/* Add your content here */}
          </View>
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
  middleContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: 16,
  },
  textBox_1: {
    marginTop: 8,
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
    height: 256,
  },
  bookListContent: {
    paddingHorizontal: 20,
  },
  bookCard: {
    width: 140,
    height: 256,
    borderRadius: 8,
    padding: 8,
    marginRight: 16,
  },
  bookCardLast: {
    marginRight: 0,
  },
  bookCover: {
    width: "100%",
    height: 192,
    borderRadius: 6,
  },
  bookTitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#131313",
  },
  bookAuthor: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.5,
    color: "#777777",
    fontWeight: "500",
  },
  bookcontainer_2: {
    height: 279,
    backgroundColor: "#00ff00",
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
