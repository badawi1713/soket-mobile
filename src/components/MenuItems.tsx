import type { AuthNavigationProp } from '@/app/routes';
import { COLORS } from '@/constants/colors';
import { SETTINGS } from '@/constants/settings';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import ConfirmationDialog from './ConfirmationDialog';
import Menu, { MenuItem } from './Menu';

const MenuItems = () => {
  const {logout} = useAuth();
  const navigation = useNavigation<AuthNavigationProp>();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'person-circle',
      onPress: () => false,
    },
    {
      label: 'Sign Out',
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
        triggerIcon="person-circle-outline"
        triggerColor={COLORS.secondary.main}
        triggerSize={30}
        isAnotherPopupShow={isDialogVisible}
      />

      <ConfirmationDialog
        visible={isDialogVisible}
        title="Sign Out"
        content="Confirm to sign out your account?"
        loadingText="Loading"
        loading={loading}
        onClose={() => setIsDialogVisible(false)}
        onCancel={() => setIsDialogVisible(false)}
        onConfirm={async () => {
          setLoading(true);
          const response = await logout(navigation);
          if (response) {
            setIsDialogVisible(false);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default MenuItems;
