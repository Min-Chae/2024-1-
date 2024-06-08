import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import styles from "./challenge.module.css"
import { useParams } from 'react-router-dom';
import FlagImage from './flag.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2'

const Challenge = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [userInfo, setUserInfo] = useState(null); // 추가 정보를 저장할 상태

  const [challenge, setChallenge] = useState([]);
  const [formData, setFormData] = useState({
    "uuid": uuid,
    "ans": ''
  });
  
  const [env, setEnv] = useState({ host: '', port: '' });
  const [htmlContent, setHtmlContent] = useState('');


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1"); // 토큰 가져오기
        if (token) {  
          const response = await axios.post('/member/nickname', token);
          setUserInfo(response.data); // 유저 정보 설정
        }
        else {
          navigate('/login', {replace: true});
        }

      } catch (error) {
        console.error('토큰 유효성 검증 중 오류 발생:', error);
      }
    };
    fetchUserInfo();
  }, [navigate]);

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
        
        Swal.fire({
          icon: "warning",
          title: "삭제",
          text: ` 까?`,
          shwoCancelButton: true,
          confirmButtonText: "삭제",
          cancelButtonText: "취소"
        }).then((res) => {
          if(res.isConfirmed) {

          }
          else{

          }
        });
      }
      else {
        alert("Wrong!") }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <div>
      {userInfo && (
      <div className={styles.board_list}>
        <div className={styles.title}>
          {challenge.number}. {challenge.title}
        </div>
        <div className={styles.description}>
            <Alert variant="secondary">
              <Alert.Heading>Question {challenge.number}</Alert.Heading>
              <p>
                {challenge.description} 
              </p>
              <hr />
              <p className="mb-0">
                <a claasName={styles.a} href="http://www.downloads.netgear.com/files/GDC/WNAP320/WNAP320%20Firmware%20Version%202.0.3.zip">Firmware Link</a>
              </p>
            </Alert>
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
      )}
    </div> 
    )
}

export default Challenge;