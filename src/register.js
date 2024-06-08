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
      alert('There is a duplicate ID');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const idPattern = /^[a-zA-Z]{4,12}$/;
    const nicknamePattern = /^[a-zA-Z0-9]{2,10}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,16}$/;

    if (!member.memberId.match(idPattern)) {
      e.preventDefault();
      alert("ID must be 4-12 characters in English only")
    } 

    else if (!member.password.match(passwordPattern)) {
      e.preventDefault();
      alert("Password must be 8-16 letters and numbers only")
    } 

    else if (member.password !== member.confirmPassword) {
      e.preventDefault();
      alert("Passwords do not match");
    } 

    else if (!member.nickname.match(nicknamePattern)) {
      e.preventDefault();
      alert("Nickname must be 2-10 letters and numbers only")
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