import PropTypes from "prop-types";
import { Tabs } from "antd";
const { TabPane } = Tabs;

// styles
import styles from "./tabMenu.module.scss";

const TabMenu = ({ tabs, callback, centered }) => {
  return (
    <Tabs defaultActiveKey='1' onChange={callback} centered={centered}>
      {tabs &&
        tabs.map((tab, idx) => (
          <TabPane tab={tab.label} disabled={tab.disabled} key={idx + 1}>
            {tab.component}
          </TabPane>
        ))}
    </Tabs>
  );
};

TabMenu.propTypes = {
  tabs: PropTypes.array.isRequired,
  callback: PropTypes.func,
  centered: PropTypes.bool
};

TabMenu.defaultProps = {
  tabs: [
    {
      label: "Tab 1",
      disabled: false,
      component: <span>Tab 1 content</span>
    },
    {
      label: "Tab 2",
      disabled: false,
      component: <span>Tab 2 content</span>
    }
  ],
  callback: key => {
    console.log(`Tab clicked: ${key}`);
  },
  centered: false
};

export default TabMenu;
