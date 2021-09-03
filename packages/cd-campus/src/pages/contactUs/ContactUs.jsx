import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AutoComplete } from "antd";
import { Banner, Button, BUTTON_SIZE } from "@cd/components";
import { fetchAllCampus } from "../../actions/campus";
import { signUp } from "../../actions/auth";

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
  const dispatch = useDispatch();
  const { campus } = useSelector(state => state.campus);
  const history = useHistory();

  // function that will submit the form
  const submitForm = e => {
    e.preventDefault();

    dispatch(signUp(formData, history));
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

  // options that will be show in campus select
  const campusOpts = campus.map(c => {
    return {
      label: c.name,
      value: c._id
    };
  });

  const onCampusChange = data => {
    // on campus change from the dropdown, find the name of the campus and set it
    const selectedCampus = campus.find(c => c._id === data);
    setFormData({ ...formData, campus: selectedCampus?.name });
  };

  useEffect(() => {
    dispatch(fetchAllCampus());
  }, []);
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
            <AutoComplete
              options={campusOpts}
              style={{
                width: "90%"
              }}
              onChange={onCampusChange}
              value={formData.campus}
              allowClear
            >
              <input
                className={styles.input}
                placeholder='Campus'
                name='campus'
                onChange={handleInput}
                value={formData.campus}
              />
            </AutoComplete>
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
