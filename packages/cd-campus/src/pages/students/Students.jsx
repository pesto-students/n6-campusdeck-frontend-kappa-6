import { useState, useEffect } from "react";
import { Table, Form, Popconfirm, Typography, Tooltip, Tag } from "antd";

import EditableCell from "../../organisms/editableCell";
import * as api from "../../api";

// assets
import styles from "./students.module.scss";

const Students = () => {
  const [students, setStudents] = useState([
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: [],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "Pushpak Bhattacharya2",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "PushpakB",
      _id: "613430a3c2fa981a5f6a2b69"
    },
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: [],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "Pushpak Bhattacharya",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "PushpakB",
      _id: "613430a3c2fa981a5f6a2b69"
    },
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: [],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "Pushpak Bhattacharya",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "PushpakB",
      _id: "613430a3c2fa981a5f6a2b69"
    },
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: [],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "Pushpak Bhattacharya",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "PushpakB",
      _id: "613430a3c2fa981a5f6a2b69"
    }
  ]);
  const [studentData, setStudentData] = useState([
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: ["asdasd", "asdasd"],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "APushpak Bhattacharya2",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "APushpakB",
      _id: "1"
    },
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: ["asdasd", "asdasd"],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "CPushpak Bhattacharya",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "DPushpakB",
      _id: "2"
    },
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: ["asdasd", "asdasd"],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "BPushpak Bhattacharya",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "CPushpakB",
      _id: "3"
    },
    {
      about: "",
      email: "rtpushpak@gmail.com",
      followers: ["asdasd", "asdasd"],
      location: "BLR",
      mySpaces: [
        "61360ffcfd445f61ca2a01a1",
        "6131924dbd25684edd494539",
        "6131dccf5581a737d72ad5f1"
      ],
      name: "DPushpak Bhattacharya",
      preferences: ["Fests", "Movies", "Travelling", "Help", "Food", "Event"],
      profileImg: "",
      savedPosts: [
        "61344e500ccf5d20aa4c7e55",
        "6134412753f7b8b81f9f62e0",
        "613496c94244ef7c1026e3e8"
      ],
      userName: "BPushpakB",
      _id: "4"
    }
  ]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  const fetchStudents = async campus => {
    const {
      data: { data }
    } = await api.getStudentsInCampus(campus);
    setStudents(data);
  };

  const isEditing = record => record._id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: "",
      email: "",
      username: "",
      location: "",
      about: "",
      ...record
    });
    setEditingKey(record._id);
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...studentData];
      const index = newData.findIndex(item => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setStudentData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setStudentData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    if (user?.result?.campus) {
      // fetchStudents(user?.result?.campus);
    }
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      editable: false
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      editable: false,
      sorter: (a, b) => a.userName.localeCompare(b.userName)
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      editable: true,
      sorter: (a, b) => a.location.localeCompare(b.location)
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
      editable: true,
      render: text => {
        if (text === "") {
          return "N/A";
        }
        return text;
      },
      ellipsis: {
        showTitle: false
      }
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
      editable: false,
      render: followers => {
        return followers.length;
      },
      ellipsis: {
        showTitle: false
      }
    },
    {
      title: "Preferences",
      dataIndex: "preferences",
      key: "preferences",
      editable: false,
      render: tags => (
        <>
          {tags.map(tag => (
            <Tag color='blue' key={tag} style={{ margin: "0.2rem 0.3rem" }}>
              {tag}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: "Operations",
      dataIndex: "operations",
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <a
              href='#'
              onClick={() => save(record._id)}
              style={{
                marginRight: 8
              }}
            >
              <a>Save</a>
            </a>
            <Popconfirm title='Cancel editing?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              style={{ marginLeft: "1rem", color: "red" }}
            >
              <Tooltip title='Coming Soon' placement='right'>
                Delete
              </Tooltip>
            </Typography.Link>
          </>
        );
      }
    }
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === "age" ? "text" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>All Students</div>
      <div className={styles.content}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            dataSource={studentData}
            columns={mergedColumns}
            size='small'
            rowClassName='editable-row'
            bordered
            pagination={{
              position: ["", "bottomCenter"],
              pageSize: 5
            }}
          />
        </Form>
      </div>
      <div className={styles.footer} />
    </div>
  );
};

export default Students;
