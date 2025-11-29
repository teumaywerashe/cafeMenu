import React from "react";
import Heros from "../components/Heros";
import Navbar from "../components/Navebar";

import ItemsDisplay from "../components/ItemsDisplay";
import Account from "../components/Account";

function UserHomePage() {
  return (
    <>
      <Navbar />
      <Heros />
      <ItemsDisplay />
      {/* <Account/> */}
    </>
  );
}

export default UserHomePage;
