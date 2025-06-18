import {COLORS} from '@/constants/colors';
import {FONTS} from '@/constants/fonts';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {handleGetUnitListData} from '@/store/slices/common-slices/unit-list-slice/actions';
import {useFocusEffect} from '@react-navigation/native';
import React, {FC, memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {moderateScale} from 'react-native-size-matters';

type Props = {
  setSelectedItem: (value: string) => void;
  selectedItem: string;
  module: 'sok' | 'soe' | 'bat' | '';
};

const Autocomplete: FC<Props> = ({
  setSelectedItem = (val: string) => val,
  selectedItem = '',
  module,
}) => {
  const dispatch = useAppDispatch();
  const {loading, data = []} = useAppSelector(state => state.unitListReducer);

  useFocusEffect(
    useCallback(() => {
      const fetchInitialData = async () => {
        try {
          const response = await dispatch(
            handleGetUnitListData({module}),
          ).unwrap();
          if (!selectedItem && response?.content?.length > 0) {
            setSelectedItem(`${response?.content[0].unitId}`);
          }
        } catch (err) {
          console.log('Failed to fetch:', err);
        }
      };

      fetchInitialData();
    }, [dispatch, module, selectedItem]),
  );

  const transformedData = data.map(item => ({
    label: item.title || item.unitName || 'No Name',
    value: item.id,
  }));

  return (
    <View style={styles.wrapper}>
      <Dropdown
        data={transformedData}
        labelField="label"
        valueField="value"
        placeholder="Select a unit"
        value={selectedItem}
        onChange={item => {
          setSelectedItem(item.value);
        }}
        maxHeight={300}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.searchInput}
        containerStyle={styles.dropdownContainer}
        activeColor={COLORS.neutral.light}
        itemTextStyle={{color: COLORS.common.black}}
        disable={loading}
        search
        searchPlaceholder="Search unit..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  dropdown: {
    flex: 1,
    height: moderateScale(45),
    borderRadius: 8,
    paddingHorizontal: moderateScale(12),
    backgroundColor: COLORS.neutral.light,
    borderWidth: 1,
    borderColor: COLORS.neutral.light,
  },
  placeholderStyle: {
    fontFamily: FONTS.oxanium,
    fontSize: moderateScale(14),
    color: COLORS.common.black,
  },
  selectedTextStyle: {
    fontFamily: FONTS.oxanium,
    fontSize: moderateScale(14),
    color: COLORS.common.black,
  },
  searchInput: {
    height: 40,
    fontSize: moderateScale(14),
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.neutral.light,
    color: COLORS.common.black,
    fontFamily: FONTS.oxanium,
  },
  dropdownContainer: {
    backgroundColor: COLORS.background.paper,
    borderRadius: 8,
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default memo(Autocomplete);
