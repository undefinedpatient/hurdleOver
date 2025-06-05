import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ForumPage from './pages/ForumPage.jsx';
import MyPostsPage from './pages/MyPostsPage.jsx';
import PostPage from './pages/PostPage.jsx';
import { UserContextProvider } from './UserContext.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import SettingPage from './pages/settingPage.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: '/register',
		element: <RegisterPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: '/login',
		element: <LoginPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: '/settings',
		element: <SettingPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: '/forum',
		element: <ForumPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: '/myposts',
		element: <MyPostsPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: '/createpost',
		element: <CreatePostPage/>,
		errorElement: <NotFoundPage/>
	},
	{
		path: "/post/:id",
		element: <PostPage/>,
		errorElement: <NotFoundPage/>
	}
]);

createRoot(document.getElementById('root')).render(
<StrictMode>
	<UserContextProvider>
		<RouterProvider router={router} />
	</UserContextProvider>
</StrictMode>,
)