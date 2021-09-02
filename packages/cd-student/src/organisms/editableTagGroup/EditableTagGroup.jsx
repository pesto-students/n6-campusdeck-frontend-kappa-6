import { useState } from "react";
import { Tag, Input, Tooltip, message } from "antd";
import PropTypes from "prop-types";

import { PlusOutlined } from "@cd/components";

// styles
import styles from "./editableTagGroup.module.scss";

const EditableTagGroup = ({ spaceData, setSpaceData }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [editInputIdx, setEditInputIdx] = useState(-1);
  const [editInputVal, setEditInputVal] = useState("");

  const handleRemove = removedTag => {
    const newTags = spaceData.tags.filter(tag => tag !== removedTag);
    setSpaceData({ ...spaceData, tags: newTags });
  };

  const showInput = () => {
    if (spaceData.tags.length >= 5) {
      message.warn("You can only add 5 tags");
    } else {
      setInputVisible(true);
    }
  };

  const handleInputChange = e => {
    const val = e.target.value;
    setInputVal(val);
  };

  const handleInputConfirm = () => {
    if (inputVal && spaceData.tags.indexOf(inputVal) === -1) {
      setSpaceData({ ...spaceData, tags: [...spaceData.tags, inputVal] });
    }

    setInputVisible(false);
    setInputVal("");
  };

  const handleEditInputChange = e => {
    const val = e.target.value;
    setEditInputVal(val);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...spaceData.tags];
    newTags[editInputIdx] = editInputVal;

    setSpaceData({ ...spaceData, tags: newTags });
    setEditInputIdx(-1);
    setEditInputVal("");
  };

  return (
    <div className={styles.container}>
      {spaceData.tags.length > 0 &&
        spaceData.tags.map((tag, idx) => {
          if (editInputIdx === idx) {
            return (
              <Input
                key={tag}
                size='small'
                className='tag-input'
                value={editInputVal}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className='edit-tag'
              key={tag}
              closable
              onClose={() => handleRemove(tag)}
            >
              <span
                onDoubleClick={e => {
                  setEditInputIdx(idx);
                  setEditInputVal(tag);
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );

          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      {inputVisible && (
        <Input
          type='text'
          size='small'
          value={inputVal}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
};

EditableTagGroup.propTypes = {
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

export default EditableTagGroup;
