import { Banner, Button, BUTTON_SIZE } from "@cd/components";

// style
import styles from "./register.module.scss";

const Register = () => {
  const submitForm = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.content}>
        <div className={styles.heading}>Complete your account</div>
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.input_group}>
            <input className={styles.input} placeholder='First Name' disabled />
            <input className={styles.input} placeholder='Last Name' disabled />
            <input
              className={styles.input}
              placeholder='Email'
              type='email'
              disabled
            />
            <input className={styles.input} placeholder='Campus' disabled />
            <input
              className={styles.input}
              placeholder='Password'
              type='password'
            />
            <input className={styles.input} placeholder='Confirm Password' />
            <input className={styles.input} placeholder='Location' />
          </div>
          <textarea
            className={styles.about_me}
            placeholder='Write a bit about yourself'
          />
          <Button className={styles.login_btn} size={BUTTON_SIZE.LARGE}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
