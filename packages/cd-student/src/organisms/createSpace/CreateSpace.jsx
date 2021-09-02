import { useState, useEffect } from "react";
import { Divider, Upload, message, Tooltip } from "antd";
import axios from "axios";

import { Button, InfoCircleFilled, CloudUploadOutlined } from "@cd/components";
import { SPACE_NAME_LIMIT } from "../../constants/space";

// styles
import styles from "./createSpace.module.scss";
import EditableTagGroup from "../editableTagGroup";

const { Dragger } = Upload;

const CreateSpace = () => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    img: "",
    campus: "",
    tags: [],
    isPublic: true
  });
  const [campus, setCampus] = useState({
    name: "VIT, Vellore"
  });
  const [remainingChars, setRemainingChars] = useState(SPACE_NAME_LIMIT);

  const props = {
    name: "file",
    multiple: false,
    async onChange(info) {
      const { status } = info.file;
      if (status !== "removed" && status !== "uploading") {
        const imageData = new FormData();
        imageData.append("file", info.file.originFileObj);
        imageData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        const response = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
          imageData
        );
        if (response.status === 200) {
          setFormData({ ...formData, img: response.data.secure_url });
          message.success(`${info.file.name} file uploaded successfully.`);
        } else {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    }
  };

  const validateMedia = file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    // // file size should be less than 5mb
    // const sizeInRange = file.size / 1024 / 1024 < 5;

    // if (!sizeInRange) {
    //   message.error("Image must smaller than 5MB!");
    // }

    return isJpgOrPng;
  };

  const submit = () => {};

  // this function will remove the tag associated to the post
  const removeTag = () => {
    console.log("tag removed");
  };

  // this function is called when a tag is selected to associate the tag to the post
  const handleTagSelect = tag => {
    setFormData({
      ...formData,
      tag
    });
  };

  const handleNameInput = e => {
    const val = e.target.value;
    const valueLen = val.length;

    setRemainingChars(SPACE_NAME_LIMIT - valueLen);

    setFormData({
      ...formData,
      name: val
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select className={styles.selector}>
          <option>Choose a campus</option>
          <option>VIT, Vellore</option>
          <option>XIME, Bangalore</option>
          <option>IIIT Hyderabad</option>
        </select>
      </div>
      <Divider />
      <div className={styles.content}>
        <div className={styles.name_section}>
          <input
            className={styles.name_input}
            placeholder='Name'
            autoComplete='off'
            value={formData.name}
            name='name'
            onChange={handleNameInput}
          />
          <div className={styles.remaining_chars}>
            {remainingChars}/{SPACE_NAME_LIMIT}
          </div>
        </div>
        <div className={styles.description_section}>
          <textarea
            className={styles.description}
            placeholder='Description'
            value={formData.desc}
            onChange={e => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>
        <div className={styles.img}>
          <Dragger beforeUpload={validateMedia} {...props}>
            <p className='ant-upload-drag-icon'>
              <CloudUploadOutlined />
            </p>
            <p className='ant-upload-text'>
              Upload a suitable image <Button type='skeleton' text='Upload' />
            </p>
            <p className='ant-upload-hint'>
              Supports only single upload. Strictly prohibit from uploading
              company data or other such files.
            </p>
          </Dragger>
        </div>
        <div classnames={styles.tags_section}>
          <EditableTagGroup />
        </div>
        <div classnames={styles.checkbox}>
          <label htmlFor='accessibility'>
            <input type='checkbox' id='accessibility' />
            <span style={{ marginLeft: "0.5rem" }}>
              Make this a public space?
            </span>
          </label>
          <Tooltip
            title='Selecting this option will make this space visible to everyone.'
            placement='right'
          >
            <InfoCircleFilled style={{ marginLeft: "0.5rem" }} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CreateSpace;
