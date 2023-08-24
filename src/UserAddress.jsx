import { useUserQuery } from './hooks/useUser';
import { useEffect } from 'react';

function UserAddress() {
	//만약 동일한 쿼리키인데... 서버 데이터가 일정 주기로 변경이 될때에는
	//서버데이터가 변경되었는데 쿼리키가 동일하므로 변경된 데이터가 갱신이 안되는 문제 발생
	//해결 방법 : useQuery의 리턴값중에 refetch라는 함수를 받고
	//일정 시간마다 해당 refetch함수를 호출하면 강제 데이터 갱신 가능
	//해당 강제 refetching하는 컴포넌트가 unmount시에는 클린업함수로 해당 refetching기능 다시 비활성화 처리
	const { data, isSuccess, refetch } = useUserQuery(2);

	useEffect(() => {
		const timer = setInterval(() => {
			refetch();
		}, 5000);

		return () => clearInterval(timer);
	}, [refetch]);

	return (
		<div>
			<h1>User Address</h1>
			{isSuccess && <p>{data.address.street}</p>}
		</div>
	);
}

export default UserAddress;
