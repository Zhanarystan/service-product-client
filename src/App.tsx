import React, { useEffect } from 'react';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './features/layouts/Sidebar';
import Navbar from './features/layouts/Navbar';
import LoginPage from './features/login/LoginPage';
import NotFound from './features/errors/NotFound';
import Loading from './features/common/Loading';
import EmployeesPage from './features/enterprise/employees/EmployeesPage';
import EmployeeCreatePage from './features/enterprise/employees/EmployeeCreatePage';
import ProductsPage from './features/enterprise/products/ProductsPage';
import EstablishmentPage from './features/enterprise/establishment/EstablishmentPage';
import CashRegister from './features/enterprise/cashRegister/CashRegister';
import EstablishmentListPage from './features/admin/establishment/EstablishmentListPage';
import EstablishmentCreatePage from './features/admin/establishment/EstablishmentCreatePage';
import EstablishmentEditPage from './features/admin/establishment/edit/EstablishmentEditPage';
import ManufacturerListPage from './features/admin/manufacturer/ManufacturerListPage';
import ManufacturerCreatePage from './features/admin/manufacturer/ManufacturerCreatePage';
import ManufacturerEditPage from './features/admin/manufacturer/ManufacturerEditPage';
import UserListPage from './features/admin/users/UserListPage';
import UserCreatePage from './features/admin/users/UserCreatePage';
import UserEditPage from './features/admin/users/UserEditPage';
import ProductListPage from './features/admin/product/ProductListPage';
import ProductCreatePage from './features/admin/product/ProductCreatePage';
import ProductEditPage from './features/admin/product/ProductEditPage';
import ServiceListPage from './features/admin/service/ServiceListPage';
import ServiceCreatePage from './features/admin/service/ServiceCreatePage';
import ServiceEditPage from './features/admin/service/ServiceEditPage';
import ProductListToAddPage from './features/enterprise/productsToAdd/ProductListToAddPage';
import AnalyticsPage from './features/enterprise/analytics/AnalyticsPage';
import { User } from './app/models/user';


function App() {
  const { userStore: { getUser, user }, commonStore } = useStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (commonStore.token) {
      getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
      navigate('/login');
    }
    console.log("Here2")
    console.log(commonStore.token)
  }, [commonStore, getUser, user]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/error" element={<Navigate to="/error/not-found" />} />
        <Route path="/error/not-found" element={<NotFound />} />
        <Route path="/enterprise/*" element={<PrivateEnterpriseRoutes />} />
        <Route path="/admin/*" element={<PrivateAdminRoutes />} />
        <Route path="/" element={<Navigate to={getInitialRoute(user)} />} />
      </Routes>
    </>
  );
}


function PrivateEnterpriseRoutes() {
  const { userStore: { user } } = useStore();

  if (user === null) return <Loading />;

  if (!user.roles.includes("establishment_seller") && !user.roles.includes("establishment_admin"))
    return <Navigate to="/error/not-found" />;
  
  console.log("HERE_1_3");
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="admin/*" element={<PrivateAdminRoutes />} /> */}
        <Route path="cash-register" element={<CashRegister />} />
        <Route path="establishment" element={<EstablishmentPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/create" element={<EmployeeCreatePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products-to-add" element={<ProductListToAddPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Routes>
    </>
  );
};

const PrivateAdminRoutes = () => {
  const { userStore: { user } } = useStore();

  if (!user) return <Loading />;

  if (!user.roles.includes("system_admin")) {
    return <Navigate to="/error/not-found" />;
  }

  return (
    <div className='row'>
      <div className='col-2'>
        <Sidebar />
      </div>
      <div className='col-9 mb-5'>
        <Navbar />
        <Routes>
          <Route path="establishments" element={<EstablishmentListPage />} />
          <Route path="establishments/:id" element={<EstablishmentEditPage />} />
          <Route path="establishments-create" element={<EstablishmentCreatePage />} />
          <Route path="manufacturers/:manufacturerId" element={<ManufacturerEditPage />} />
          <Route path="manufacturers" element={<ManufacturerListPage />} />
          <Route path="manufacturer-create" element={<ManufacturerCreatePage />} />
          <Route path="users/:id" element={<UserEditPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="user-create" element={<UserCreatePage />} />
          <Route path="products/:productId" element={<ProductEditPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="product-create" element={<ProductCreatePage />} />
          <Route path="services/:serviceId" element={<ServiceEditPage />} />
          <Route path="services" element={<ServiceListPage />} />
          <Route path="service-create" element={<ServiceCreatePage />} />
        </Routes>
      </div>
    </div>
  );
};

const getInitialRoute = (user: any) => {
  if (user && user.roles.includes("establishment_seller")) {
    return "/enterprise/cash-register";
  } else if (user && user.roles.includes("system_admin")) {
    return "/admin/establishments";
  } else {
    return "/login";
  }
};

export default observer(App);