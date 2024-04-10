import React, {useState} from 'react';
import Logo from './logo.jpg';
import styles from "./login.module.css"
import { Link } from 'react-router-dom';
import './index.css'

const Login = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  
  const handleSubmit = (e) => {
    console.log(formData.id)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.text}> 로그인 </div>
      
        <div className={styles.member}>
          <div className={styles.field}>
              <b>아이디</b>
              <span><input type="text" name="id" onChange={handleChange} /></span>
          </div>

          <div className={styles.field}>
              <b>비밀번호</b>
              <input type="password" name="password" onChange={handleChange} />
          </div>

          <input type="submit" value="Login" />
        </div>
      </form>
     
    </div>
  )
}

export default Login;