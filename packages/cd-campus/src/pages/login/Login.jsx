import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Banner, Button, BUTTON_SIZE } from "@cd/components";
import { signIn } from "../../actions/auth";

// styles
import styles from "./login.module.scss";

const initialFormState = {
  email: "",
  password: ""
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();
  const history = useHistory();

  // function that will submit the form
  const submitForm = e => {
    e.preventDefault();

    console.log(formData);

    dispatch(signIn(formData, history));
  };

  // function that will handle input
  const handleInput = e => {
    const val = e.target.value;
    const field = e.target.name;

    setFormData({
      ...formData,
      [field]: val
    });
  };

  return (
    <div className={styles.container}>
      <Banner
        items={[
          "A unified space for students to interact and grow",
          "Onboard an entire batch of students in one simple click",
          "Manage & get insights on various forums of a campus."
        ]}
      />
      <div className={styles.content}>
        <div className={styles.heading}>Login to Admin Dashboard</div>
        <form className={styles.form} onSubmit={submitForm}>
          <input
            className={styles.input}
            placeholder='Email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleInput}
          />
          <input
            className={styles.input}
            type='password'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleInput}
          />
          <Button className={styles.login_btn} size={BUTTON_SIZE.LARGE}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
