import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';


const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage/>,
		errorElement: <div>Not Found</div>
	},
	{
		path: '/register',
		element: <RegisterPage/>,
		errorElement: <div>Not Found</div>
	},
	{
		path: '/login',
		element: <LoginPage/>,
		errorElement: <div>Not Found</div>
	}
]);

createRoot(document.getElementById('root')).render(
<StrictMode>
	<RouterProvider router={router} />
</StrictMode>,
)