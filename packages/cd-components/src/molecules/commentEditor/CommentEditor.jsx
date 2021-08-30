import { Form, Button, Input } from "antd";
const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => {
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
    </>
  );
};

export default CommentEditor;
