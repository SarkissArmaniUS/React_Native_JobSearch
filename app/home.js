import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

import FrequentSearches from "../components/Searches/FrequentSearches";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchButton = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search/${searchTerm.trim()}`);
    }
  };

  const handleTagPress = (tag) => {
    setSearchTerm(tag);
    router.push(`/search/${tag}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={handleSearchButton}
          />

          <FrequentSearches onPressTag={handleTagPress} />

          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
