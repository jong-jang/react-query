import { useQuery } from '@tanstack/react-query';

// 만약 같은 url로 fatching요청을 할때 쿼리값이 달라지면
// 쿼리키 내용을 배열의 두번째값으로 추가해서 변경처리
// fetching되는 데이터가 다름에도 불구하고 쿼리키가 동일하면 reftching하지 않기 때문
const fetchUser = async ({ queryKey }) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

export const useUserQuery = (num) => {
	return useQuery(['user', num], fetchUser, {
		refetchOnWindowFocus: false, // 포커싱이 브라우저에 다시들어오면 리패치 기본값 true
		refetchOnMount: false, // 컴포넌트가 마운트될 때마다 리패치 기본값 true
		cacheTime: 1000 * 5, // 캐시 유지시키는 시간
		staleTime: 1000 * 6,
	});
};

/* 
  fresh : 서버데이터를 최신상태로 인식하는 상태
  stale : 서버데이터를 오래된 데이터로 인식하는 상태 (default: 0ms)
  stale 시간이 남아있다고 하더라도 해당 데이터를 활용하지 않는 컴포넌트로 넘어가는 순간 바로 inactive 상태로 변경
  cache : 서버데이터가 stale 상태가 된 이후에 캐시에 유지시키는 시간
  inactive : 서버데이터가 더이상 컴포넌트에서 활용되지 않는 상태
  만약 inactive상태에 돌입하면 그때부터 cache 타임 소진
  cache타임을 모두 소진하면 GC 자동으로 해당 데이터를 메모리에서 제거
*/
