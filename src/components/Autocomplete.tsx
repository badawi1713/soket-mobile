import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
import Icon from '@react-native-vector-icons/ionicons';
import React, { memo, useRef, useState } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { moderateScale } from 'react-native-size-matters';
import Typography from './Typography';

const Autocomplete: React.FC = memo(() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<String>('1');

  const dropdownController = useRef<any>(null);
  const searchRef = useRef<any>(null);

  console.log(selectedItem)

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center', 

           },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}
      >
        <AutocompleteDropdown
          ref={searchRef}
          initialValue="1"
          controller={(controller: any) => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: 'down' })}
          dataSet={[
            { id: '1', title: 'Tanjung Awar-Awar - Unit 1' },
            { id: '2', title: 'Tanjung Awar-Awar - Unit 2' },
            { id: '3', title: 'Tenayan - Unit 1' },
            { id: '4', title: 'Tenayan - Unit 2' },
          ]}
          onSelectItem={item => {
            item && setSelectedItem(item.id)
          }}
          emptyResultText="No data found"
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          loading={loading}
          useFilter={true}
          textInputProps={{
            placeholder: 'Select a unit',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 8,
              paddingLeft: 16,
              fontFamily: FONTS.oxanium,
              color: COLORS.common.black,
              fontSize: moderateScale(14)
            },
          }}
          inputContainerStyle={{
            borderRadius: 8,
            backgroundColor: COLORS.neutral.main,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: COLORS.background.paper,
            boxShadow: '0px 10px 25px 1px rgba(0,0,0,0.2)',
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1, 
           }}
          renderItem={(item) => (
            <Typography variant="body2" color={item?.id === selectedItem ? COLORS.primary.main : COLORS.common.black} className='p-2'>{item?.title}</Typography>
          )}
           flatListProps={{
            ItemSeparatorComponent: () => <View className='border-b border-border-light' />,
          style: {
            borderWidth: 0,
          },
        }}
          showChevron={true}
          closeOnBlur={false}
          showClear={false}
          ChevronIconComponent={<Icon name="chevron-down" size={20} />}
          ClearIconComponent={<Icon name="close-circle-outline" size={20} color={COLORS.error.main} />}
        />
      </View>
     
    </>
  );
});

export default Autocomplete;