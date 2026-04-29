import Destinations from "./components/Destinations";
import Hero from "./components/Hero";
import LanguagePrep from "./components/LanguagePrep";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";


export default function Home() {
  return (
      <main>
        <Hero/>
        <Services/>
        <Destinations/>
        <LanguagePrep/>
        <WhyChooseUs/>
      </main>
  );
}
