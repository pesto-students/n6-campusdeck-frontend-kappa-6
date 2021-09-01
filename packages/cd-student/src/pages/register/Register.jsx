import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Banner, Button, BUTTON_SIZE } from "@cd/components";
import { signup } from "../../actions/auth";

// style
import styles from "./register.module.scss";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  campus: "",
  password: "",
  confirmPassword: "",
  location: "",
  about: ""
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();
  const history = useHistory();

  // function that will submit the form
  const submitForm = e => {
    e.preventDefault();

    dispatch(signup(formData, history));
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
          "Quick and easy registration process",
          "Find and interact with your friends from college",
          "Spread the word about an event to different campuses"
        ]}
      />
      <div className={styles.content}>
        <div className={styles.heading}>Complete your account</div>
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.input_group}>
            <input
              className={styles.input}
              placeholder='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleInput}
            />
            <input
              className={styles.input}
              placeholder='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleInput}
            />
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
              placeholder='Campus'
              name='campus'
              value={formData.campus}
              onChange={handleInput}
            />
            <input
              className={styles.input}
              placeholder='Password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleInput}
            />
            <input
              className={styles.input}
              placeholder='Confirm Password'
              name='confirmPassword'
              type='password'
              onChange={handleInput}
              value={formData.confirmPassword}
            />
            <input
              className={styles.input}
              placeholder='Location'
              name='location'
              onChange={handleInput}
              value={formData.location}
            />
          </div>
          <textarea
            className={styles.about_me}
            placeholder='Write a bit about yourself'
            name='about'
            onChange={handleInput}
            value={formData.about}
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
