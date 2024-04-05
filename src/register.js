import React from 'react';
import Logo from './logo.jpg';
import styles from "./register.module.css"
import { Link } from 'react-router-dom';

const List = () => {
  return (
    <div className={styles.board_wrap}>
      <div className={styles.board_title}>
        <img src={Logo} alt="Logo img"/>
        <strong>IoT-CTF</strong>
        <Link to={`/register`}>
          <div className={styles.register}>register</div>
        </Link>
      </div>  


      <form>
        <div className={styles.member}>
          <div className={styles.field}>
              <b>아이디</b>
              <span className={styles.placehold}><input type="text" /></span>
          </div>
          <div className={styles.field}>
              <b>비밀번호</b>
              <input className="userpw" type="password" />
          </div>
          <div className={styles.field}>
              <b>비밀번호 확인</b>
              <input className="userpw-confirm" type="password" />
          </div>
          <div className={styles.field}>
              <b>닉네임</b>
              <input type="text" />
          </div>

          <input type="submit" value="가입하기" />
        </div>
      </form>
     
    </div>
  )
}

export default List;