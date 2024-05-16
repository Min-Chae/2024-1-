import React, {useState} from 'react';
import styles from "./login.module.css"
import './index.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState({
    memberId: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/member/login', member);
      
      if (response.status === 200) {
        const token = response.data;
        setCookie('token', token, { path: '/' });
        fetchNickname(token);
        alert('로그인 성공!');
        navigate('/', {replace: true});
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
  };

  const setCookie = (name, value, options = {}) => {
    options = {
      path: '/',
      // 기본적으로 쿠키는 현재 도메인의 모든 경로에서 접근 가능하도록 설정
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  };

  const fetchNickname = async (token) => {
    try {
      const response = await axios.post('/member/nickname', token);
  
      if (response.status === 200) {
        const nickname = response.data;
        console.log('닉네임:', nickname);
      } else {
        console.error('닉네임 조회 실패:', response.data);
      }
    } catch (error) {
      console.error('닉네임 조회 중 오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.text}> Login </div>
        
      <Form.Group className={styles.input} controlId="formBasicEmail">
        <Form.Label className="white">ID</Form.Label>
        <Form.Control name="memberId" type="text" placeholder="Enter the ID" onChange={handleChange} />
      </Form.Group>

      <Form.Group className={styles.input} controlId="formBasicPassword">
        <Form.Label className="white">Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Enter the Password" onChange={handleChange} />
      </Form.Group>

      <Button className={styles.button} variant="secondary" type="submit">
        Login
      </Button>
    </form>
  )
}

export default Login;