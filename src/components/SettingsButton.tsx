import { COLORS } from '@/constants/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { toast } from 'sonner-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

type SettingsButtonProps = {
  pageName: string;
};

const SettingsButton = ({ pageName }: SettingsButtonProps) => {
  const copyToClipboard = async () => {
    const path = `myapp://(authenticated)/(tabs)/${pageName.toLowerCase()}`;
    await Clipboard.setString(path);
    toast.success(`Page Link copied to your clipboard`);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <TouchableOpacity style={styles.button} activeOpacity={0.6}>
          <Ionicons name="ellipsis-horizontal-outline" size={30} color={COLORS.primary.main} />
        </TouchableOpacity>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item
          key="link"
          textValue={`Copy Link to ${pageName}`}
          onSelect={copyToClipboard}>
          <DropdownMenu.ItemTitle>Copy</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon
            ios={{
              name: 'link',
              pointSize: 24,
            }}
            ></DropdownMenu.ItemIcon>
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          <DropdownMenu.Item key="select">
            <DropdownMenu.ItemTitle>Select Tasks</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: 'square.stack',
                pointSize: 24,
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>

          <DropdownMenu.Item key="view">
            <DropdownMenu.ItemTitle>View</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: 'slider.horizontal.3',
                pointSize: 24,
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>

          <DropdownMenu.Item key="activity">
            <DropdownMenu.ItemTitle>Activity Log</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: 'chart.xyaxis.line',
                pointSize: 24,
              }}></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
  },
});