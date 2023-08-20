import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Userinfo from './Userinfo';
import UserAddress from './UserAddress';
import Menu from './Menu';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<Menu />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/name' element={<Userinfo />} />
					<Route path='/address' element={<UserAddress />} />
				</Routes>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
