import { useState } from "react";
import { Tag, Input, Tooltip, message } from "antd";

import { PlusOutlined } from "@cd/components";

const EditableTagGroup = () => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [editInputIdx, setEditInputIdx] = useState(-1);
  const [editInputVal, setEditInputVal] = useState("");

  const handleRemove = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    if (tags.length >= 5) {
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
    if (inputVal && tags.indexOf(inputVal) === -1) {
      setTags([...tags, inputVal]);
    }

    setInputVisible(false);
    setInputVal("");
  };

  const handleEditInputChange = e => {
    const val = e.target.value;
    setEditInputVal(val);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIdx] = editInputVal;

    setTags(newTags);
    setEditInputIdx(-1);
    setEditInputVal("");
  };

  return (
    <>
      {tags.length > 0 &&
        tags.map((tag, idx) => {
          if (editInputIdx === idx) {
            return (
              <Input
                key={tag}
                size='small'
                value={editInputVal}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag key={tag} closable onClose={() => handleRemove(tag)}>
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
    </>
  );
};

export default EditableTagGroup;
