import { useState } from 'react';
import { useUserQuery, useUserMutation } from './hooks/useUser';

function UserForm() {
	const { data } = useUserQuery(1);
	const [UserName, setUserName] = useState(data?.name);

	// useUserMutation훅은 호출해서 userMutation이란 이름으로 객체 반환
	const userMutation = useUserMutation();

	// 이벤트 발생시 서버데이터 변경요청하는 핸들러 함수
	const handleSubmit = (e) => {
		e.preventDefault();

		// userMutation 객체의 mutate함수로 쿼리값 전달 ['변경할 데이터', 변경할 document고유 아이디값]
		userMutation.mutate([UserName, 1]);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default UserForm;
