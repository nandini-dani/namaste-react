import React, { lazy, Suspense, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
//import Grocery from './components/Grocery';

//const heading = React.createElement('h1', {}, 'Hello from inside React');

const AppLayout = () => {
  const [userName, setUserName] = useState('Nanna');
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </Provider>
  );
};

const Grocery = lazy(() => import('./components/Grocery'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Body /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h1>Loadding.....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: '/restaurant/:resId', element: <RestaurantMenu /> },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
