import Typography from '@/components/Typography'; // Custom Typography component
import { COLORS } from '@/constants/colors'; // Color constants
import Ionicons from '@react-native-vector-icons/ionicons';
import { clsx } from 'clsx'; // For conditional classes
import React, { FC, Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Popover from 'react-native-popover-view';
import Divider from './Divider';

// Define a menu item type
export interface MenuItem {
  label: string; // Label for the menu item
  icon?: React.ComponentProps<typeof Ionicons>['name']; // Icon name for Ionicons
  onPress: () => void; // Action to execute when the item is clicked
}

// Define props for the Menu component
export interface MenuProps {
  items: MenuItem[]; // Array of menu items
  triggerIcon?: React.ComponentProps<typeof Ionicons>['name']; // Icon for triggering the menu
  triggerColor?: string; // Color of the trigger icon
  triggerSize?: number; // Size of the trigger icon
  isAnotherPopupShow: boolean;
}

const Menu: FC<MenuProps> = ({
  items,
  triggerIcon = 'menu', // Default trigger icon
  triggerColor = COLORS.neutral.dark, // Default trigger icon color
  triggerSize = 24, // Default trigger icon size
  isAnotherPopupShow = false,
}) => {

  const [showPopup, setShowPopup] = useState(false); // Visibility of the menu

  return isAnotherPopupShow ? (
    <TouchableOpacity>
      <Ionicons name={triggerIcon} size={triggerSize} color={triggerColor} />
    </TouchableOpacity>
  ) : (
    <Popover
      from={
        <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
          <Ionicons
            name={triggerIcon}
            size={triggerSize}
            color={triggerColor}
          />
        </TouchableOpacity>
      }
      arrowSize={{width: 0, height: 0}}
      isVisible={showPopup}
      onRequestClose={() => setShowPopup(false)} // Close the menu when needed
      popoverStyle={{
        backgroundColor: COLORS.neutral.light,
        borderRadius: 8,
      }}>
      {/* Popover Content */}
      <View className="p-4 gap-4">
        {items.map((item, index) => {
          return (
            <Fragment key={index}>
              <TouchableOpacity
                onPress={() => {
                  setShowPopup(false); // Close the menu on item click
                  setTimeout(() => item.onPress(), 500)
                }}
                className={clsx(
                  'flex-row items-center rounded-lg',
                  index > 0 && 'mt-0', // Add margin to items after the first one
                  'bg-transparent hover:bg-gray-100', // Hover effect for consistency
                )}>
                {/* Icon */}
                {item.icon && (
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={COLORS.light.icon}
                    style={{marginRight: 8}}
                  />
                )}
                {/* Label */}
                <Typography
                  variant="body2"
                  weight="regular"
                  color={
                    item?.label?.toLowerCase().includes('soket mobile')
                      ? COLORS.light.icon
                      : COLORS.light.text
                  }>
                  {item.label}
                </Typography>
              </TouchableOpacity>
              {items.length - 1 !== index && <Divider />}
            </Fragment>
          );
        })}
      </View>
    </Popover>
  );
};

export default Menu;
