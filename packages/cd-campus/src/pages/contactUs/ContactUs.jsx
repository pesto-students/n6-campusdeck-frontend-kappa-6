import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { AutoComplete } from "antd";
import { Banner, Button, BUTTON_SIZE } from "@cd/components";
// import { signup } from "../../actions/auth";

// style
import styles from "./contactUs.module.scss";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  campus: "",
  message: ""
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialFormState);
  //   const dispatch = useDispatch();
  //   const history = useHistory();

  // function that will submit the form
  const submitForm = e => {
    e.preventDefault();

    console.log(formData);
    // dispatch(signup(formData, history));
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

  const options = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" }
  ];

  const onChange = data => {
    setFormData({ ...formData, campus: data });
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
        <div className={styles.heading}>Contact Us</div>
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
            {/* <input
              className={styles.input}
              placeholder='Campus'
              name='campus'
              value={formData.campus}
              onChange={handleInput}
            /> */}
            <AutoComplete
              options={options}
              className={styles.input}
              style={{
                width: 200
              }}
              // onSearch={onSearch}
              onChange={onChange}
              placeholder='Campus'
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
          </div>
          <textarea
            className={styles.message}
            placeholder='Write a message for better chances of approval'
            name='message'
            onChange={handleInput}
            value={formData.message}
          />
          <Button className={styles.submit_btn} size={BUTTON_SIZE.LARGE}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
