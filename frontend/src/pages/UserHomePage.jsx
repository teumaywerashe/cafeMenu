import React from "react";
import Heros from "../components/Heros";
import Navbar from "../components/Navebar";

import ItemsDisplay from "../components/ItemsDisplay";

function UserHomePage() {
  return (
    <>
      <Navbar />
      <Heros />
      <ItemsDisplay />
    
    </>
  );
}

export default UserHomePage;
