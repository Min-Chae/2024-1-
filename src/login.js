import React, {useState} from 'react';
import styles from "./login.module.css"
import './index.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Login = () => {
  const [member, setMember] = useState({
    memberId: '',
    password: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/member/login', member);
      
      if (response.status === 200) {
        alert('로그인 성공!');
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 요청 중 오류가 발생했습니다.');
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