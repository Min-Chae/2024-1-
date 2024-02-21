import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import "./list.css"
import Logo from './logo.jpg';

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
    <div className="board_wrap">
      <div className="board_title">
        <img src={Logo} alt="Logo img" />
        <strong>IoT-CTF</strong>
      </div>

      <div className="board_list">
        <div className="top">
          <div className="num">No.</div>
          <div className="title">문제</div>
          <div className="level">난이도</div>
      </div>
    
      <ul>
        {problems.map(problem => (
          <li key={problem.uuid} className="list"> 
            <div className="num">{problem.title}</div>
            <div className="title">{problem.title}</div>
            <div className="level">{problem.title}</div> 
          </li>
        ))}
      </ul>
    </div>            
  </div>
  )
}

export default List;