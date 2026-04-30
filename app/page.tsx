import Hero from './components/Hero';
import Services from './components/Services';
import Destinations from './components/Destinations';
import SuccessStories from './components/SucessStories';
import LanguagePrep from './components/LanguagePrep';
import WhyChooseUs from './components/WhyChooseUs';
import Contact from './components/Contact';

export default function Home(): JSX.Element {
  return (
    <main>
      <Hero />
      <Services />
      <Destinations />
      <SuccessStories />
      <LanguagePrep />
      <WhyChooseUs />
      <section id="contact" className="py-24 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
}