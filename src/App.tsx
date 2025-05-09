
import Banner from "./sections/banner";
import Features from "./sections/features";
import Footer from "./sections/footer";
import Header from "./sections/header";


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
