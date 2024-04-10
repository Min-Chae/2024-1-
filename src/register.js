import React, {useState} from 'react';
import Logo from './logo.jpg';
import styles from "./register.module.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <div className="board_title">
      <img src={Logo} alt="Logo img"/>

      <Link to={`/`} style={{ textDecoration: "none"}}>
        <strong>IoTeacher</strong>
      </Link>
      <Link to={`/register`}>
        <div className="register">register</div>
      </Link>
      <Link to={`/login`}>
        <div className="login">login</div>
      </Link>
    </div>  

      <form className={styles.form} onSubmit={handleSubmit} >
        <div className={styles.text}>회원가입</div>

        <div className={styles.member}>
          <div className={styles.field}>
            <b>아이디</b>
            <input type="text" name="id" onChange={handleChange} />
          </div>

          <div className={styles.field}>
              <b>비밀번호</b>
              <input type="password" name="password" onChange={handleChange} />
          </div>

          <div className={styles.field}>
              <b>비밀번호 확인</b>
              <input type="password" name="confirmPassword" onChange={handleChange} />
          </div>

          <div className={styles.field}>
              <b>닉네임</b>
              <input type="text" name="nickname" onChange={handleChange} />
          </div>

          <input type="submit" value="Register" />
        </div>
      </form>
     
    </div>
  )
}

export default Register;