import React from "react";
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import './App.css';
import Login from './pages/Login/Login.jsx'; 
import ForgotPassword from "./pages/Login/ForgotPassword.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import MyTeam from './pages/MyTeam/MyTeam.jsx';
import Loader from './components/Loader.jsx';
import MyAccount from './pages/MyAccount/MyAccount.jsx';
import DistributorForm from './pages/Distributors/DistributorForm.jsx';
import DistributorList from './pages/Distributors/DistributorList.jsx';
import AddHotelForm from "./pages/Hotel/AddHotelForm.jsx";
import CategoryList from "./pages/Categories/categoryList.jsx";
import CategoryForm from "./pages/Categories/categoryForm.jsx";
import HotelBrand from "./pages/Brands/HotelBrand.jsx";
import BrandGroupForm from "./pages/Brands/BrandGroupForm.jsx";
import SubBrandForm from "./pages/Brands/SubBrandForm.jsx";
import ActivitiesForm from "./pages/Activities/ActivitiesForm.jsx";
import ActivitiesList from "./pages/Activities/ActivitiesList.jsx";
import LocationList from "./pages/Locations/LocationList.jsx";
import LocationForm from "./pages/Locations/LocationForm.jsx";
import HotelList from "./pages/Hotel/HotelList.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="layout">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/*"
          element={
            <>
              <Header onToggleSidebar={toggleSidebar} />

              <div className="w100 df">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/my-team" element={<MyTeam />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/distributor-list" element={<DistributorList />} />
                    <Route path="/distributor-form" element={<DistributorForm />} />
                    <Route path="/distributor-form/:id" element={<DistributorForm />} />
                    <Route path="/hotel-list" element={<HotelList />} />
                    <Route path="/add-hotel" element={<AddHotelForm />} />
                    <Route path="/add-hotel/:id" element={<AddHotelForm />} />
                    <Route path="/hotel-categories" element={<CategoryList />} />
                    <Route path="/add-hotel-category" element={<CategoryForm />} />
                    <Route path="/add-hotel-category/:id" element={<CategoryForm />} />
                    <Route path="/hotel-brands" element={<HotelBrand />} />
                    <Route path="/hotel-brands/:id" element={<HotelBrand />} />
                    <Route path="/brand-group-form" element={<BrandGroupForm />} />
                    <Route path="/brand-group-form/:id" element={<BrandGroupForm />} />
                    <Route path="/sub-brand-form" element={<SubBrandForm />} />
                    <Route path="/sub-brand-form/:id" element={<SubBrandForm />} />
                    <Route path="/add-activity" element={<ActivitiesForm />} />
                    <Route path="/add-activity/:id" element={<ActivitiesForm />} />
                    <Route path="/activities-list" element={<ActivitiesList />} />
                    <Route path="/locations-list" element={<LocationList />} />
                    <Route path="/add-location" element={<LocationForm />} />
                    <Route path="/add-location/:id" element={<LocationForm />} />
                  </Routes>
                </main>
              </div>
            </>
          }
        />
      </Routes>

    </section>
  );
}

export default App;