import { Select } from "antd";
import { TabMenu } from "@cd/components";

// styles
import styles from "./inviteModal.module.scss";

const InviteModal = ({ setInviteEmails }) => {
  function handleChange(value) {
    setInviteEmails(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TabMenu
          tabs={[
            {
              label: "Manual",
              disabled: false,
              content: (
                <div>
                  <Select
                    mode='tags'
                    allowClear
                    style={{ width: "100%", margin: "2rem 0" }}
                    placeholder='Enter the email addresses of students'
                    onChange={handleChange}
                  />
                </div>
              )
            },
            {
              label: "CSV",
              disabled: false,
              content: <div>Coming soon</div>
            }
          ]}
          centered
        />
      </div>
    </div>
  );
};

export default InviteModal;
