import { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, Tag, Upload, message } from "antd";
import axios from "axios";

import { Button, InfoCircleFilled, CloudUploadOutlined } from "@cd/components";
import TitleInput from "../titleInput";

// styles
import styles from "./mediaPost.module.scss";

const { CheckableTag } = Tag;
const { Dragger } = Upload;

const MediaPost = ({
  postData,
  setPostData,
  space,
  removeTag,
  handleTagSelect
}) => {
  const [image, setImage] = useState("");

  const props = {
    name: "file",
    multiple: false,
    async onChange(info) {
      const { status } = info.file;
      if (status !== "removed" && status !== "uploading") {
        const formData = new FormData();
        formData.append("file", info.file.originFileObj);
        formData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        const response = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
          formData
        );
        if (response.status === 200) {
          setImage(response.data.secure_url);
          message.success(`${info.file.name} file uploaded successfully.`);
        } else {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

      //   const formData = new FormData();
      //   formData.append("file", info.file.originFileObj);
      //   formData.append(
      //     "upload_preset",
      //     process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      //   );
      //   const response = await axios.post(
      //     process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
      //     formData
      //   );
      //   if (response.status === 200) {
      //     message.success(`${info.file.name} file uploaded successfully.`);
      //   } else {
      //     message.error(`${info.file.name} file upload failed.`);
      //   }
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

  return (
    <div className={styles.container}>
      <TitleInput postData={postData} setPostData={setPostData} />
      <div className={styles.body}>
        <Dragger beforeUpload={validateMedia} {...props}>
          <p className='ant-upload-drag-icon'>
            <CloudUploadOutlined />
          </p>
          <p className='ant-upload-text'>
            Drag and drop your media here or{" "}
            <Button type='skeleton' text='Upload' />
          </p>
          <p className='ant-upload-hint'>
            Supports only single upload. Strictly prohibit from uploading
            company data or other such files.
          </p>
        </Dragger>
      </div>

      <div className={styles.post_labels}>
        <div className={styles.tag_title}>Select a tag:</div>
        {space &&
          space.tags &&
          space.tags.map(tag => (
            <CheckableTag
              className={styles.label}
              key={tag}
              checked={tag === postData.tag}
              onChange={checked => handleTagSelect(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
      </div>
      <div className={styles.options}>
        <label htmlFor='accessibility'>
          <input type='checkbox' id='accessibility' />
          <span style={{ marginLeft: "0.5rem" }}>Make this a public post?</span>
        </label>
        <Tooltip
          title='Selecting this option will make this post visible to anyone who accesses the space.'
          placement='right'
          key='geekblue'
        >
          <InfoCircleFilled style={{ marginLeft: "0.5rem" }} />
        </Tooltip>
      </div>
      {image && <img style={{ height: "12rem" }} src={image} alt='' />}
    </div>
  );
};

MediaPost.propTypes = {
  postData: PropTypes.object.isRequired,
  setPostData: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
  handleTagSelect: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired
};

export default MediaPost;
