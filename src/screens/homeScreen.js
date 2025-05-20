// screens/Home.js
import { Text } from "react-native";
import ScreenLayout from "../components/screen-layout/screenLayout";
import HeroSection from "../components/hero-section";

const Home = () => {
  return (
    <ScreenLayout>
      <HeroSection />
    </ScreenLayout>
  );
};

export default Home;
