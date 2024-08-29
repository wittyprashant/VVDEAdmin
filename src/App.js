import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  Route, Routes, useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

import { AxiosInterceptor } from './axios_call'
import './scss/style.scss'
import AuthenticatedRoute from './route/AuthenticatedRoute';
import UnAuthenticatedRoute from './route/UnAuthenticatedRoute';

// Containers
const DefaultLayout = React.lazy(() => import('./hoc/Layout/Layout'))

const Login = lazy(() => import('./components/auth/Login'))
const Logout = lazy(() => import('./components/auth/Logout'))
const Home = lazy(() => import('./components/auth/Home'))
const Register = lazy(() => import('./components/auth/Register'))
const RegisterFormContributor = lazy(() => import('./components/auth/RegisterFormContributor'))
const RegisterFormUser = lazy(() => import('./components/auth/RegisterFormUser'))
const Material = lazy(() => import('./components/auth/Material'))
const MaterialForm = lazy(() => import('./components/auth/MaterialForm'))
// const DataserMeta = lazy(() => import('./components/auth/DataserMeta'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


function withRouter(Component) {
  return ( props ) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component { ...props } navigate={ navigate } location={ location } params={params} />;
  }
}

class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <>
        <Suspense fallback={loading}>
          <AxiosInterceptor>
          <Routes>
            <Route exact path="/login" name="Login Page" element={
              <AuthenticatedRoute redirectTo="/dashboard">
                <Login />
              </AuthenticatedRoute>
            } />
            
            <Route path='/logout' element={<Logout/>} />
            <Route path="/" name="Home" element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/register/contributor' element={<RegisterFormContributor/>} />
            <Route path='/register/user' element={<RegisterFormUser/>} />
            <Route path='/material' element={<Material/>} />
            <Route path='/material/form' element={<MaterialForm/>} />
            {/* <Route path='/material/form' element={<MaterialForm/>} /> */}
            <Route path="*" name="Home" element={
              <UnAuthenticatedRoute redirectTo="/login">
                <DefaultLayout />
              </UnAuthenticatedRoute>
            } />
          </Routes>
          </AxiosInterceptor>
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}


export default withRouter(connect(mapStateToProps)(App));
