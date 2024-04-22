import React, {useState} from 'react';
import styles from "./login.module.css"
import './index.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.text}> Login </div>
        
      <Form.Group className={styles.input} controlId="formBasicEmail">
        <Form.Label className="white">ID</Form.Label>
        <Form.Control type="ID" placeholder="Enter the ID" />
      </Form.Group>

      <Form.Group className={styles.input} controlId="formBasicPassword">
        <Form.Label className="white">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter the Password" onChange={handleChange} />
      </Form.Group>

      <Button className={styles.button} variant="secondary" type="submit">
        Login
      </Button>
    </form>
  )
}

export default Login;