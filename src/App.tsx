
import Banner from "./components/sections/banner";
import Features from "./components/sections/features";
import Footer from "./components/sections/footer";
import Header from "./components/sections/header";


function App() {
 
  return (
    <div className="relative">
      <Header />
      <div className="relative top-[70px]">
        <Banner />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default App;
