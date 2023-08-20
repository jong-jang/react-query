import { useUserQuery } from './hooks/useUser';

function UserAddress() {
	const { data, isSuccess } = useUserQuery(2);

	return (
		<div>
			<h1>User Address</h1>
			{isSuccess && <p>{data.address.street}</p>}
		</div>
	);
}

export default UserAddress;
