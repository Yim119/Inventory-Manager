
    const table = document.getElementById('userTable');
    const tableBody = document.getElementById('userTableBody');

    // 서버에서 사용자 데이터 가져오기
    async function fetchUserData() {
    try {
    // Axios를 사용하여 서버에 GET 요청
    const response = await axios.get('/user/allUserlist');
    const users = response.data;  // 받아온 데이터: 사용자 목록

    // 각 사용자에 대해 테이블에 행 추가
    users.forEach(user => {
    const row = tableBody.insertRow(-1);  // 새로운 행 삽입

    // 각 열에 데이터 추가
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7); // 추가: 정보 보기 칸

    cell1.innerHTML = user.username;  // 유저이름
    cell2.innerHTML = user.email;  // 이메일
    cell3.innerHTML = user.tel;  // 전화번호
    cell4.innerHTML = user.roles;  // 권한
    cell5.innerHTML = user.team;

    // "팀 설정" 버튼 생성
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-primary';
    editButton.textContent = '팀 설정';
    editButton.addEventListener('click', () => {
    // 클릭 시 팀 선택 옵션과 수정 버튼 생성
    const teamSelect = document.createElement('select');
    teamSelect.className = 'form-control';
    teamSelect.name = 'teamSelect';
    teamSelect.innerHTML = `
                            <option value="" disabled selected>팀을 선택하세요</option>
                            <option value="1반">1반</option>
                            <option value="2반">2반</option>
                            <option value="3반">3반</option>
                            <option value="4반">4반</option>
                            <option value="5반">5반</option>
                            <option value="6반">6반</option>
                            <option value="7반">7반</option>
                            <option value="8반">8반</option>
                            <option value="9반">9반</option>
                            <option value="10반">10반</option>
                        `;

    // "수정" 버튼 생성
    const updateButton = document.createElement('button');
    updateButton.className = 'btn btn-success';
    updateButton.textContent = '수정';
    updateButton.addEventListener('click', () => {
    const selectedTeam = teamSelect.value;
    if (selectedTeam) {
    sendTeamToServer(user.email, selectedTeam);
    cell5.innerHTML = selectedTeam;
} else {
    cell5.innerHTML = '팀이 선택되지 않았습니다.';
}
    // 삭제 생성한 요소들 제거
    cell6.innerHTML = '';
    cell6.appendChild(editButton);
});

    cell6.innerHTML = '';
    cell6.appendChild(teamSelect);
    cell6.appendChild(updateButton);
});

    cell6.appendChild(editButton);

    // 추가: "회원 삭제" 버튼 생성
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = '회원 삭제';
    deleteButton.addEventListener('click', () => {
        const confirmation = confirm("회원 삭제를 진행하시겠습니까?");

        if(confirmation) {
            deleteUser(user.email, row);
        } else {
            alert("회원 삭제가 취소되었습니다.");
        }
});

    // 변경: "회원 삭제" 버튼을 가장 마지막에 추가
    cell8.appendChild(deleteButton);

    // 변경: "정보 보기" 링크 생성
    const infoLink = document.createElement('a');
    infoLink.href = `/user/manager/userinfo?email=${user.email}`;
    infoLink.textContent = '정보 보기';
    cell7.appendChild(infoLink);
});

    // 테이블 표시
    table.style.display = 'table';

} catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
}
}

    async function sendTeamToServer(email, selectedTeam) {
    try {
    const response = await axios.post('/user/updateteam', {
    email: email,
    team: selectedTeam
});
    console.log(response.data);
} catch (error) {
    console.error('팀 정보 업데이트 중 오류 발생:', error);
}
}

    // 추가: 사용자 삭제 함수
    async function deleteUser(email, row) {
    try {
    const response = await axios.delete(`/user/delete/${email}`);
    console.log(response.data);
    // 삭제 성공 시 해당 행 삭제
    row.remove();
} catch (error) {
    console.error('사용자 삭제 중 오류 발생:', error);
}
}

    function goBack() {
    window.history.back();
}

    // 사용자 데이터 가져오기 함수 호출
    fetchUserData();
