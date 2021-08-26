import { Banner, Button } from "@cd/components";

// styles
import styles from "./login.module.scss";

const Login = () => {
  const submitForm = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <Banner />
      <div className={styles.content}>
        <div className={styles.heading}>Login to your account</div>
        <form className={styles.form} onSubmit={submitForm}>
          <input className={styles.input} type='email' placeholder='Email' />
          <input
            className={styles.input}
            type='password'
            placeholder='Password'
          />
          <Button className={styles.login_btn} size='large'>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
