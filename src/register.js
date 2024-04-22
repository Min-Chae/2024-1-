import React, {useState} from 'react';
import styles from "./register.module.css"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Register = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const do_register = async (e) => {
    e.preventDefault();

    const response = await axios.post('', formData);

    if (response) {
      alert("회원가입 완료!");
    }
  };

  const handleSubmit = (e) => {
    const idPattern = /^[a-zA-Z]{4,12}$/;
    const nicknamePattern = /^[a-zA-Z0-9]{2,10}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,16}$/;

    if (!formData.id.match(idPattern)) {
      e.preventDefault();
      alert("아이디는 4-12글자의 영문만 가능합니다")
    } 

    else if (!formData.password.match(passwordPattern)) {
      e.preventDefault();
      alert("비밀번호는 8-16글자의 영문과 숫자만 가능합니다")
    } 

    else if (formData.password !== formData.confirmPassword) {
      e.preventDefault();
      alert("비밀번호가 일치하지 않습니다");
    } 

    else if (!formData.nickname.match(nicknamePattern)) {
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
        <Form.Control name="id" type="id" placeholder="Enter the ID" onChange={handleChange} />
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
        <Form.Control name="nickname" placeholder="Enter the Nickname" onChange={handleChange} />
      </Form.Group>

      <Button className={styles.button} variant="secondary" type="submit">
        Reigister
      </Button>
    </form>
  )
}

export default Register;