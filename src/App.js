import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Userinfo from './Userinfo';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<h1>hello</h1>
				<Userinfo></Userinfo>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
