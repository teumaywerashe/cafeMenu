import React from 'react'
import { FaCog, FaTachometerAlt, FaUserCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function SupperAdminSidebare() {
  return (
    <div className="hidden sm:flex flex-col w-[20%] min-h-screen rounded-2xl bg-[#fbfdfc] shadow-[0_1px_20px_black] gap-1 mt-2.5 inset-shadow-violet-300">
      <NavLink
        className={({ isActive }) =>
          `flex items-center p-2 gap-1 m-1.5 text-black rounded-2xl hover:bg-amber-100 ${
            isActive ? "bg-red-500" : "bg-[#f9f9f9]"
          }`
        }
        to="/superadmin/dashboard"
      >
        <FaTachometerAlt size={18}/>
        <span>Users DashBoard</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex items-center p-2 gap-1 m-1.5 text-black rounded-2xl hover:bg-amber-100 ${
            isActive ? "bg-red-500" : "bg-[#f9f9f9]"
          }`
        }
        to="/superadmin/management"
      >
        <FaUserCog size={18} />
        <span>users Manageent</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex items-center p-2 gap-1 m-1.5 text-black rounded-2xl hover:bg-amber-100 ${
            isActive ? "bg-red-500" : "bg-[#f9f9f9]"
          }`
        }
        to="/superadmin/setting"
      >
        {/* <fagear */}
        <FaCog size={18}/>
        <span>Setting</span>
      </NavLink>{" "}
    </div>
  )
}

export default SupperAdminSidebare
