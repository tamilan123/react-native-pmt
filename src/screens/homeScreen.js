// screens/Home.js
import { Text } from "react-native";
import ScreenLayout from "../components/screen-layout/screenLayout";
import HeroSection from "../components/hero-section";
import DigitalTreasures from "../components/digital-treasures";
import ShoeBanner from "../components/shoe-banner";

const Home = () => {
  return (
    <ScreenLayout>
      <HeroSection />
      <DigitalTreasures />
      <ShoeBanner />
    </ScreenLayout>
  );
};

export default Home;
