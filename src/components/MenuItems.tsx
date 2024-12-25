import type {AuthNavigationProp} from '@/app/routes';
import {COLORS} from '@/constants/colors';
import {useAuth} from '@/hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import ConfirmationDialog from './ConfirmationDialog';
import Menu, {MenuItem} from './Menu';
import { SETTINGS } from '@/constants/settings';

const MenuItems = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const {logout} = useAuth();
  const navigation = useNavigation<AuthNavigationProp>();

  const menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'person-circle',
      onPress: () => false,
    },
    {
      label: 'Logout',
      icon: 'log-out-outline',
      onPress: () => setIsDialogVisible(true),
    },
    {
      label: `SOKET Mobile - v${SETTINGS.version}`,
      onPress: () => false,
    },
  ];

  return (
    <SafeAreaView>
      {/* Menu Component */}

      <Menu
        items={menuItems}
        triggerIcon="ellipsis-horizontal"
        triggerColor={COLORS.dark.icon}
        triggerSize={30}
        isAnotherPopupShow={isDialogVisible}
      />

      <ConfirmationDialog
        visible={isDialogVisible}
        title="Confirm Action"
        content="Confirm to logout your account?"
        onClose={() => setIsDialogVisible(false)}
        onCancel={() => setIsDialogVisible(false)}
        onConfirm={() => {
          setIsDialogVisible(false);
          logout(navigation);
        }}
        loading={false} // Change this to `true` to simulate loading
      />
    </SafeAreaView>
  );
};

export default MenuItems;
