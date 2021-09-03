import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Divider, Upload, message, Tooltip } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Button, InfoCircleFilled, CloudUploadOutlined } from "@cd/components";
import { SPACE_NAME_LIMIT } from "../../constants/space";
import { fetchAllCampus } from "../../actions/campus";

// styles
import styles from "./createSpace.module.scss";
import EditableTagGroup from "../editableTagGroup";

const { Dragger } = Upload;

const CreateSpace = ({ spaceData, setSpaceData }) => {
  const [remainingChars, setRemainingChars] = useState(SPACE_NAME_LIMIT);
  // fetch list of campus from the global store
  const { campus } = useSelector(state => state.campus);
  const dispatch = useDispatch();

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
          setSpaceData({ ...spaceData, img: response.data.secure_url });
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

  const handleNameInput = e => {
    const val = e.target.value;
    const valueLen = val.length;

    setRemainingChars(SPACE_NAME_LIMIT - valueLen);

    setSpaceData({
      ...spaceData,
      name: val
    });
  };

  useEffect(() => {
    // fetch all the campus
    dispatch(fetchAllCampus());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select
          onChange={e => setSpaceData({ ...spaceData, campus: e.target.value })}
          className={styles.selector}
        >
          <option>Choose a campus</option>
          {campus.length > 0 &&
            campus.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <Divider />
      <div className={styles.content}>
        <div className={styles.name_section}>
          <input
            className={styles.name_input}
            placeholder='Name'
            autoComplete='off'
            value={spaceData.name}
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
            value={spaceData.desc}
            onChange={e => setSpaceData({ ...spaceData, desc: e.target.value })}
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
          <EditableTagGroup spaceData={spaceData} setSpaceData={setSpaceData} />
        </div>
        <div classnames={styles.checkbox}>
          <label htmlFor='accessibility'>
            <input
              type='checkbox'
              id='accessibility'
              checked={spaceData.isPublic}
              onChange={e => {
                setSpaceData({ ...spaceData, isPublic: !spaceData.isPublic });
              }}
            />
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

CreateSpace.propTypes = {
  spaceData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    img: PropTypes.string,
    campus: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    isPublic: PropTypes.bool
  }).isRequired,
  setSpaceData: PropTypes.func.isRequired
};

export default CreateSpace;
