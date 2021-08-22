import PropTypes from "prop-types";
import { Menu, Dropdown } from "antd";

const ContextMenu = ({ children, items }) => {
  // default onClick handler
  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  const MenuComponent = (
    <Menu onClick={onClick}>
      {items &&
        items.map((item, idx) => <Menu.Item key={idx + 1}>{item}</Menu.Item>)}
    </Menu>
  );

  return (
    <Dropdown
      overlay={MenuComponent}
      trigger={["click"]}
      placement='bottomLeft'
    >
      {children}
    </Dropdown>
  );
};

ContextMenu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array
};

ContextMenu.defaultProps = {
  items: ["Menu 1", "Menu 2", "Menu 3"]
};

export default ContextMenu;
