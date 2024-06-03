import React, {useState} from 'react';
import styles from "./register.module.css"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [member, setMember] = useState({
    memberId: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const do_register = async () => {
    
    try {
      const response = await axios.post('/member/register', member);
      if (response.status === 200) {
        navigate('/login', {replace: true});
      }

    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('중복된 ID가 있습니다');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const idPattern = /^[a-zA-Z]{4,12}$/;
    const nicknamePattern = /^[a-zA-Z0-9]{2,10}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,16}$/;

    if (!member.memberId.match(idPattern)) {
      e.preventDefault();
      alert("아이디는 4-12글자의 영문만 가능합니다")
    } 

    else if (!member.password.match(passwordPattern)) {
      e.preventDefault();
      alert("비밀번호는 8-16글자의 영문과 숫자만 가능합니다")
    } 

    else if (member.password !== member.confirmPassword) {
      e.preventDefault();
      alert("비밀번호가 일치하지 않습니다");
    } 

    else if (!member.nickname.match(nicknamePattern)) {
      e.preventDefault();
      alert("닉네임은 2-10글자의 영문과 숫자만 가능합니다")
    } 

    else {
      do_register();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.text}> Register </div>
        
      <Form.Group className={styles.input}>
        <Form.Label className="white">ID</Form.Label>
        <Form.Control name="memberId" type="text" placeholder="Enter the ID" onChange={handleChange} />
      </Form.Group>

      <Form.Group className={styles.input}>
        <Form.Label className="white">Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Enter the Password" onChange={handleChange} />
      </Form.Group>

      <Form.Group className={styles.input}>
        <Form.Label className="white">Password Check</Form.Label>
        <Form.Control name="confirmPassword" type="password" placeholder="Enter the Password" onChange={handleChange} />
      </Form.Group>

      <Form.Group className={styles.input}>
        <Form.Label className="white">Nickname</Form.Label>
        <Form.Control name="nickname" type="text" placeholder="Enter the Nickname" onChange={handleChange} />
      </Form.Group>

      <Button className={styles.button} variant="secondary" type="submit">
        Reigister
      </Button>
    </form>
  )
}

export default Register;