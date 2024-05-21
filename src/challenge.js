import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import styles from "./challenge.module.css"
import { useParams } from 'react-router-dom';
import FlagImage from './flag.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Challenge = () => {
  const { uuid } = useParams();

  const [challenge, setChallenge] = useState([]);
  const [formData, setFormData] = useState({
    "uuid": uuid,
    "ans": ''
  });
  
  const [env, setEnv] = useState({ host: '', port: '' });
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/problem/find?uuid=${uuid}`);
      setChallenge(response.data);
    };
    fetchData();
  }, [uuid]);

  useEffect(() => {
    if (env.host !== '' && env.port !== '') {
      setHtmlContent(`<div>
      host : ${env.host} <br>
      port : ${env.port} </div>`
      );  
    }
  }, [env]);

  const create_env = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/problem/environment?uuid=${uuid}`);
      setEnv(response.data);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const check_answer = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/problem/grade', formData);

      if(response.data) { 
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1"); // 토큰 가져오기
        const score = await axios.post('/member/score', {
          level: challenge.level,
          token: token
        });
        alert("Right! (Your score : + " + score.data + ")"); 
      }
      else {
        alert("Wrong!") }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div>
      <div className={styles.board_list}>
        <div className={styles.title}>
          {challenge.number}. {challenge.title}
        </div>
        
        <div className={styles.description}>
          Question : {challenge.description}
        </div>
        
        <form onSubmit={check_answer}>
          <img src={FlagImage} alt="" className={styles.flagImage}/>
          <div className={styles.flag}>Enter the Flag: </div>
          <div>
            <Form.Group controlId="formBasicEmail" className={styles.input}>
              <Form.Control type="text" name="ans" value={formData.ans} onChange={handleChange} />
            </Form.Group>
            <Button variant="dark" type="submit" className={styles.button}>
              Submit
            </Button>
          </div>
        </form>

        <form onSubmit= {create_env}>  
        <Button variant="dark" type="submit" className={styles.create}>Create Virtual Environment</Button>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className={styles.html} />
        </form>
      </div>
    </div> 
    )
}

export default Challenge;