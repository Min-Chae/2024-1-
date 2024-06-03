import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import styles from "./rank.module.css"

const Rank = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        await axios.get('/member/create_dummy');
        const response = await axios.get('/member/rank');
        setScores(response.data);
  };
    fetchData();
  }, []);

  return (
    <div className={styles.board_list}>
        <div className={styles.top}>
          <div className={styles.num}>Rank</div>
          <div className={styles.title}>Nickname</div>
          <div className={styles.level}>Score</div>
      </div>

      <ul>
        {scores.map((score, index) => (
          <li key={score.memberId} className={styles.list}>
            <div className={styles.num}>{index + 1}</div>
            <div className={styles.title}>{score.nickname}</div>
            <div className={styles.level}>{score.score}</div>
          </li>
        ))}
      </ul>
    </div>        
    )
}

export default Rank;