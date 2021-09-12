import PropTypes from "prop-types";
import { Menu, Dropdown } from "antd";

const ContextMenu = ({ children, items, handler }) => {
  const MenuComponent = (
    <Menu onClick={handler}>
      {items && items.map(item => <Menu.Item key={item}>{item}</Menu.Item>)}
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
  items: PropTypes.array,
  handler: PropTypes.func
};

ContextMenu.defaultProps = {
  items: ["Menu 1", "Menu 2", "Menu 3"],
  handler: ({ key }) => {
    console.log(`Click on item ${key}`);
  }
};

export default ContextMenu;
