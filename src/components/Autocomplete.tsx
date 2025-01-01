import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
import Icon from '@react-native-vector-icons/ionicons';
import React, { memo, useRef, useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Typography from './Typography';

const Autocomplete: React.FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<String>('');

  const dropdownController = useRef<any>(null);
  const searchRef = useRef<any>(null);

  console.log(selectedItem)

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}
      >
        <AutocompleteDropdown
          ref={searchRef}
          controller={(controller: any) => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: 'down' })}
          dataSet={[
            { id: '1', title: 'Alpha' },
            { id: '2', title: 'Beta' },
            { id: '3', title: 'Gamma' },
          ]}
          onSelectItem={item => {
            item && setSelectedItem(item.id)
          }}

          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          loading={loading}
          useFilter={false}
          textInputProps={{
            placeholder: 'Select a unit',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 8,
              paddingLeft: 16,
              fontFamily: FONTS.oxanium
            },
          }}
          inputContainerStyle={{
            borderRadius: 8,
            backgroundColor: COLORS.neutral.main
          }}
          suggestionsListContainerStyle={{
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item) => (
            <Typography className='p-4'>{item?.title}</Typography>
          )}
          showChevron={true}
          closeOnBlur={false}
          ChevronIconComponent={<Icon name="chevron-down" size={20} />}
          ClearIconComponent={<Icon name="close-circle-outline" size={20} color={COLORS.error.main} />}
        />
      </View>
     
    </>
  );
});

export default Autocomplete;