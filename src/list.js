import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from './logo.jpg';
import styles from "./list.module.css"

const List = () => {
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    const CreateData = async () => {
      await axios.get('/problem/create_dummy');
    }
    CreateData();
  }, [problems]);
  
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get('/problem/list');
        setProblems(response.data);
    };
    fetchData();
  }, []);

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

      <div className={styles.board_list}>
        <div className={styles.top}>
          <div className={styles.num}>No.</div>
          <div className={styles.title}>문제</div>
          <div className={styles.level}>난이도</div>
      </div>

      <ul>
        {problems.map(problem => (
          <li key={problem.uuid} className={styles.list}> 
            <div className={styles.num}>{problem.number}</div>

            <Link to={`/challenge/${problem.uuid}`}>
              <div className={styles.title}>{problem.title}</div>
            </Link>

            <div className={styles.level}>{problem.level}</div> 
          </li>
        ))}
      </ul>
    </div>            
  </div>
  )
}

export default List;