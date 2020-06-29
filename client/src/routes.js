import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { AuthPage } from './components/pages/Auth/Auth/AuthPage'
import { LoginPage } from './components/pages/Auth/Login/LoginPage'

import { CreateService } from './components/pages/Service/CreateService'
import { ServicesPage } from './components/pages/Service/ServicesPage'
import { DetailService } from './components/pages/Service/DetailService'
import { ProductsPage } from './components/pages/Product/ProductsPage'
import { DetailProduct } from './components/pages/Product/DetailProduct'
import { CreateProduct } from './components/pages/Product/CreateProduct'
import { CreateAppointment } from './components/pages/Appointment/CreateAppointment'
import { AppointmentsPage } from './components/pages/Appointment/AppointmentsPage'
import { DetailAppointment } from './components/pages/Appointment/DetailAppointment'
import { CreateOrder } from './components/pages/Order/CreateOrder'
import { OrdersPage } from './components/pages/Order/OrdersPage'
import { DetailOrder } from './components/pages/Order/DetailOrder'
import { CreateCart } from './components/pages/Cart/CreateCart'
import { CartsPage } from './components/pages/Cart/CartsPage'
import { DetailCart } from './components/pages/Cart/DetailCart'

import { CreateUser } from './components/pages/Admin/CreateUser'
import { UsersPage } from './components/pages/Admin/UsersPage'
import { DetailUser } from './components/pages/Admin/DetailUser'
import { RootPage } from './components/pages/Root/RootPage'
import { Profile } from './components/pages/Profile/Profile'

export const useRoutes = (isAuthenticated, store) => {
  if (isAuthenticated) {

    return (
      <Switch>
        <Route path="/profile" exact>
          <Profile store={store} />
        </Route>
        <Route path="/createuser" exact>
          <CreateUser store={store} />
        </Route>
        <Route path="/users" exact>
          <UsersPage store={store} />
        </Route>
        <Route path="/detailuser/:id">
          <DetailUser />
        </Route>
        <Route path="/root" exact>
          <RootPage />
        </Route>
        <Route path="/products" exact>
          <ProductsPage store={store} />
        </Route>
        <Route path="/createproduct" exact>
          <CreateProduct />
        </Route>
        <Route path="/detailproduct/:id">
          <DetailProduct />
        </Route>
        <Route path="/services" exact>
          <ServicesPage store={store} />
        </Route>
        <Route path="/createservice" exact>
          <CreateService />
        </Route>
        <Route path="/detailservice/:id">
          <DetailService />
        </Route>
        <Route path="/appointments" exact>
          <AppointmentsPage store={store} />
        </Route>
        <Route path="/createappointment" exact>
          <CreateAppointment />
        </Route>
        <Route path="/detailappointment/:id">
          <DetailAppointment />
        </Route>
        <Route path="/orders" exact>
          <OrdersPage store={store} />
        </Route>
        <Route path="/createorder" exact>
          <CreateOrder />
        </Route>
        <Route path="/detailorder/:id">
          <DetailOrder />
        </Route>
        <Route path="/carts" exact>
          <CartsPage store={store} />
        </Route>
        <Route path="/createcart" exact>
          <CreateCart />
        </Route>
        <Route path="/detailcart/:id">
          <DetailCart />
        </Route>
        <Redirect to="/products" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      {/* <Route path="/login" exact>
        <LoginPage />
      </Route> */}
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
