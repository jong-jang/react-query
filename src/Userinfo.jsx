import UserForm from './UserForm';
import { useUserQuery } from './hooks/useUser';

function UserInfo() {
	const { data, isSuccess, isError } = useUserQuery(1);

	return (
		<div>
			<h1>User Information</h1>
			{isSuccess && <h2>{data.name}</h2>}
			{isError && <p>Data fething에 실패했습니다.</p>}
			<UserForm />
		</div>
	);
}

export default UserInfo;
