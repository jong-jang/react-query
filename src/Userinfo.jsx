import { useQuery } from '@tanstack/react-query';

function UserInfo() {
	const fetchUser = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
		return await response.json();
	};

	const { data, isSuccess, isError } = useQuery(['user'], fetchUser);

	return (
		<div>
			<h1>User Information</h1>
			{isSuccess && <h2>{data.name}</h2>}
			{isError && <p>Data fething에 실패했습니다.</p>}
		</div>
	);
}

export default UserInfo;
