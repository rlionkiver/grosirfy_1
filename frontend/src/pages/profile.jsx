import React from "react";
import FormPage from "../components/form/formProfile/formProfile";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sideBar/sidebar";

const ProfilePage = () => {
  return (
    <div className="">
      <div className="bg-[#2F3A4B]">
        <Navbar />
      </div>
        <FormPage />
        <Sidebar />
      <div className="-mt-[100%]">
      <Footer/>
      </div>
    </div>
  );
};

export default ProfilePage;
