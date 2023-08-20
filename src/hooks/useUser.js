// useQuery : 문자열로 구성된 고유한 쿼리키라는 것을 이용해서 비동기데이터를 fetching후 관리해주는 함수
// useMutation : 데이터를 가져오는 것 뿐만 아니라 서버데이터를 직접 변경요청할 수 있는 함수
// useQueryClient : 추가적인 인스턴스 객체를 호출하기 위한 함수
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 기존의 데이터를 가져오는 커스텀 hook
const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

export const useUserQuery = (num) => {
	return useQuery(['user', num], fetchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		cacheTime: 1000 * 5,
		staleTime: 1000 * 6,
	});
};

// 서버쪽의 데이터 변경 요청을 하는 커스텀 hook
/* 
  GET: 요청 url에 queryString형태로 전달
  POST: 클라이언트쪽에서 body객체를 통해서 내부적으로 전달
  PUT: 클라이언트쪽에서 body객체를 통해서 내부적으로 전달
  DELETE: 요청 url에 queryString형태로 전달
*/
export const updateUserName = async ([userName, num]) => {
	// 파라미터로 받은 두번째값을 요청URL의 쿼리스트링 형태로 연결
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		// 서버쪽 데이터 변경할 내용은 body객체에 담아서 전달 (문자화해서)
		method: 'PATCH',
		body: JSON.stringify({
			name: userName,
		}),
	});
	const result = await response.json();
	return result;
};

// 실제 컴포넌트에서 서버 데이터 변경요청할때 활용할 커스텀 훅
export const useUserMutation = () => {
	// 새로운 쿼리 클라이언트 객체 활성화
	const queryClient = useQueryClient();

	// useMutation(데이터변경함수, {onSuccess: 서버데이터 변경성공, onFail: 서버데이터 변경실패})
	return useMutation(updateUserName, {
		// 서버 데이터 변경이 성공하면 반환값을 파라미터로 전달
		onSuccess: (args) => {
			console.log(args);
			// 새롭게 만든 쿼리 클라이언트 객체의 setQueryData함수를 호출해서 반환받은 데이터로 새로운 쿼리키를 만들고 두번째 인수로 반환데이터를 전달
			queryClient.setQueryData(['user', args.id], args);
		},
	});
};
