import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  Layout,
  MenuItem,
  Text,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
} from "@ui-kitten/components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/auth";

const MenuIcon = () => <Ionicons name="menu" size={50} />;

const HeaderBar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderLeftActions = () => <Text>MexL Cinema</Text>;

  const renderRightActions = () => {
    return (
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem title="Home" onPress={() => navigation.navigate("Home")} />
        <MenuItem
          title="List Movie"
          onPress={() => navigation.navigate("ViewAll")}
        />
        {token ? (
          <>
            <MenuItem
              title="Profile"
              onPress={() => navigation.navigate("Profile")}
            />
            <MenuItem title="Logout" onPress={() => dispatch(logout())} />
          </>
        ) : (
          <MenuItem
            title="Sign In"
            onPress={() => navigation.navigate("Login")}
          />
        )}
      </OverflowMenu>
    );
  };

  return (
    <Layout
      style={{
        paddingTop: 40,
      }}
    >
      <TopNavigation
        accessoryLeft={renderLeftActions}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

export default HeaderBar;
