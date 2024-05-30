import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import Root from './utils/root';
import ProtectedRoutes from './utils/ProtectedRoutes';
import PublicRoute from './utils/publicRoute';
import PageNotFound from "./pages/PageNotFound";

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <PublicRoute />,
        children: [
          { path: '/', element: <LoginPage /> },
          { path: '/signup', element: <Register /> },
        ],
      },
      {
        path: '/home',
        element: <ProtectedRoutes />,
        children: [{ path: '', element: <Home /> }],
      },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;