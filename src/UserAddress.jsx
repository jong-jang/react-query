import { useUserQuery } from './hooks/useUser';

function UserAddress() {
	const { data, isSuccess } = useUserQuery();

	return (
		<div>
			<h1>User Adress</h1>
			{isSuccess && <p>{data.address.street}</p>}
		</div>
	);
}

export default UserAddress;
