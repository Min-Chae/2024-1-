import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavbarElement() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null); // 추가 정보를 저장할 상태

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1"); // 토큰 가져오기
        if (token) {
          const response = await axios.post('/member/nickname', token);
          setUserInfo(response.data); // 유저 정보 설정
        }
      } catch (error) {
        console.error('토큰 유효성 검증 중 오류 발생:', error);
      }
    };
    fetchUserInfo();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // 로그아웃 처리 (필요 시 서버에 로그아웃 요청)
      // 예를 들어, await axios.post('/member/logout');

      // 쿠키에서 토큰 삭제
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // userInfo 상태 초기화
      setUserInfo(null);

      // 로그인 페이지로 리다이렉트
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="../">  
            <strong>IoTeacher</strong>  
          </Navbar.Brand>

        {userInfo || (
          <Nav className="collapse navbar-collapse justify-content-end">
            <Nav.Link href="../login">Login</Nav.Link>
            <Nav.Link href="../register">Reigster</Nav.Link>
          </Nav>
        )}
          
        
        {userInfo && (
        <Nav className="collapse navbar-collapse justify-content-end">
          <Nav.Link href="../rank">{userInfo}</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
        )}
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavbarElement;