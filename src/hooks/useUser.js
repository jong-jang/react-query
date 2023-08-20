import { useQuery } from '@tanstack/react-query';

const fetchUser = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
	return await response.json();
};

export const useUserQuery = () => {
	return useQuery(['user'], fetchUser, {
		refetchOnWindowFocus: false, // 포커싱이 브라우저에 다시들어오면 리패치 기본값 true
		refetchOnMount: false, // 컴포넌트가 마운트될 때마다 리패치 기본값 true
	});
};
