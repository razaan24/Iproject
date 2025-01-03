import { BrowserRouter, Routes, Route } from "react-router";
import LandingPage from "./Views/landingPage/LandingPage";
import Register from "./Views/landingPage/Register";
import Login from "./Views/landingPage/Login";
import Dashboard from "./Views/Dashboard/Dashboard";
import DashboardDetail from "./Views/Dashboard/DashboardDetail";
import AddDashboard from "./Views/Dashboard/AddDashboard";
import UpdateDashboard from "./Views/Dashboard/UpdateDashboard";
import Profile from "./Views/Profile/Profile";
import UpdateProfile from "./Views/Profile/UpdateProfile";
import Saved from "./Views/Saved/Saved";
import Category from "./Views/Category/Category";
import AddCategory from "./Views/Category/AddCategory";
import UpdateCategory from "./Views/Category/UpdateCategory";
import BaseLayout from "./Views/BaseLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* landingpage */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Dashboard */}
        <Route index element={<LandingPage />} />
        <Route element={<BaseLayout />}>
          <Route path="/dashboards" element={<Dashboard />} />
          <Route path="/dashboards/:id" element={<DashboardDetail />} />
          <Route path="/add-dashboard" element={<AddDashboard />} />
          <Route path="/update-dashboard" element={<UpdateDashboard />} />
          {/* Profile */}
          <Route path="/account" element={<Profile />} />
          <Route path="/update-account" element={<UpdateProfile />} />
          {/* Saved */}
          <Route path="/saved" element={<Saved />} />
          {/* Category */}
          <Route path="/categories" element={<Category />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/update-category" element={<UpdateCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
