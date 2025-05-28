import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Login from './Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App/>,
		errorElement: <div>Not Found</div>
	},
	{
		path: '/login',
		element: <Login/>,
		errorElement: <div>Not Found</div>
	}
]);

createRoot(document.getElementById('root')).render(
<StrictMode>
	<RouterProvider router={router} />
	
</StrictMode>,
)