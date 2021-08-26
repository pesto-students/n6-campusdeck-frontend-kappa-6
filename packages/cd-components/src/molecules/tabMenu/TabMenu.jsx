import PropTypes from "prop-types";
import { Tabs } from "antd";
import ContextMenu from "../contextMenu/ContextMenu";

// styles
import styles from "./tabMenu.module.scss";

const { TabPane } = Tabs;

const TabMenu = ({ tabs, callback, centered, extraContent }) => {
  return (
    <Tabs
      defaultActiveKey='1'
      onChange={callback}
      centered={centered}
      tabBarExtraContent={
        extraContent.enabled ? (
          <ContextMenu
            items={extraContent.menuItems}
            handler={extraContent.handler}
          >
            <div>{extraContent.text}</div>
          </ContextMenu>
        ) : null
      }
    >
      {tabs &&
        tabs.map((tab, idx) => (
          <TabPane tab={tab.label} disabled={tab.disabled} key={idx + 1}>
            {tab.content}
          </TabPane>
        ))}
    </Tabs>
  );
};

TabMenu.propTypes = {
  tabs: PropTypes.array,
  callback: PropTypes.func,
  centered: PropTypes.bool,
  extraContent: PropTypes.object
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
  centered: false,
  extraContent: {
    enabled: false
  }
};

export default TabMenu;
