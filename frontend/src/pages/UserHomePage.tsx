import Heros from "../components/Heros";
import Navbar from "../components/Navebar";
import ItemsDisplay from "../components/ItemsDisplay";
import Footer from "../components/Footer";

function UserHomePage() {
  return (
    <>
      <Navbar />
      <Heros />
      <ItemsDisplay />
      <Footer />
    </>
  );
}

export default UserHomePage;
