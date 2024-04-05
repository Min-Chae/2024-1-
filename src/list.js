import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Logo from './logo.jpg';
import { Link } from 'react-router-dom';
import styles from "./list.module.css"

const List = () => {
  const [problems, setProblems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
        await axios.get('/problem/create_dummy');
        const response = await axios.get('/problem/list');
        console.log(response.data);
          setProblems(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.board_wrap}>
      <div className={styles.board_title}>
        <img src={Logo} alt="Logo img"/>
        <strong>IoT-CTF</strong>
        <Link to={`/register`}>
          <div>register</div>
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