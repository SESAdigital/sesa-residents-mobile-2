import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '@src/configs/colors';
import AppModalContainer from '@src/modals/AppModalContainer';
import Size from '@src/utils/useResponsiveSize';
import React, { useLayoutEffect, useRef } from 'react';
import AppText from '../AppText';
import { MaterialSymbolsCloseRounded } from '../icons';
import SubmitButton from './SubmitButton';
import AppCheckIcon from '../custom/AppCheckIcon';
import fonts from '@src/configs/fonts';
import { SelectInputData } from '@src/types/default';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  placeholder: string;
  handleBgClose: () => void;
  data: SelectInputData[];
  selectedItem: string | null;
  onChange: (val: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
}

const AppSelectModal = (props: Props): React.JSX.Element => {
  const {
    isVisible,
    onClose,
    handleBgClose,
    placeholder,
    data,
    selectedItem,
    onBlur,
    onChange,
  } = props;

  const flatListRef = useRef<FlatList>(null);

  const selectedIndex = data?.findIndex(({ value }) => value === selectedItem);

  useLayoutEffect(() => {
    if (isVisible && selectedIndex !== undefined && selectedIndex !== -1) {
      flatListRef.current?.scrollToIndex({
        index: selectedIndex,
        // animated: true,
      });
    }
  }, [isVisible, selectedIndex]);

  return (
    <AppModalContainer
      isVisible={isVisible}
      style={{ padding: 0 }}
      onClose={handleBgClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.modalCloseContainer}
            onPress={onClose}
          >
            <MaterialSymbolsCloseRounded
              height={Size.calcAverage(28)}
              width={Size.calcAverage(28)}
              color={colors.BLUE_120}
            />
          </TouchableOpacity>
          <AppText style={styles.modalHeaderTitle}>{placeholder}</AppText>
        </View>

        <FlatList
          ref={flatListRef}
          data={data}
          style={{ maxHeight: Size.getHeight() / 2 }}
          showsVerticalScrollIndicator
          onScrollToIndexFailed={info => {
            const wait = setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: false,
              });
            }, 500);
            return () => clearTimeout(wait);
          }}
          renderItem={({ item, index }) => {
            const isSelected = item?.value === selectedItem;
            return (
              <AppSelectInputRow
                title={item?.title}
                onBlur={onBlur}
                isLast={index === data?.length - 1}
                isSelected={isSelected}
                onPress={() => {
                  onChange(isSelected ? '' : item?.value);
                  if (!isSelected) {
                    onClose();
                  }
                }}
              />
            );
          }}
          keyExtractor={(_, index) => index?.toString()}
        />

        <View style={styles.modalFooter}>
          <SubmitButton onPress={onClose} variant="SECONDARY" title="Close" />
        </View>
      </View>
    </AppModalContainer>
  );
};

interface AppSelectInputRowProps {
  onPress: () => void;
  onBlur?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
  isSelected: boolean;
  isLast?: boolean;
  title: string;
}

function AppSelectInputRow(props: AppSelectInputRowProps) {
  const { onPress, onBlur, isSelected, isLast, title } = props;
  return (
    <TouchableOpacity
      onBlur={onBlur}
      onPress={onPress}
      style={[
        styles.item,
        isSelected && {
          backgroundColor: colors.LIGHT_GRAY_200,
        },
        isLast && { borderBottomWidth: 0 },
      ]}
    >
      <AppText style={styles.itemText}>{title}</AppText>
      <AppCheckIcon isChecked={isSelected} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(14),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(22),
    borderBottomWidth: Size.calcHeight(1),
    borderColor: colors.LIGHT_GRAY_300,
  },

  itemText: {
    fontFamily: fonts.INTER_500,
    color: colors.GRAY_400,
    maxWidth: Size.calcWidth(310),
    paddingRight: Size.calcWidth(10),
  },

  modalCloseContainer: {
    position: 'absolute',
    right: Size.calcWidth(21),
    padding: Size.calcAverage(5),
    top: Size.calcHeight(3),
    bottom: Size.calcHeight(3),
    justifyContent: 'center',
    zIndex: 2,
  },

  modalContainer: {
    backgroundColor: colors.WHITE_100,
    borderTopLeftRadius: Size.calcAverage(12),
    borderTopRightRadius: Size.calcAverage(12),
    overflow: 'hidden',
  },

  modalFooter: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(18),
    borderTopColor: colors.WHITE_300,
    borderTopWidth: Size.calcHeight(2),
  },

  modalHeader: {
    padding: Size.calcAverage(16),
    position: 'relative',
  },

  modalHeaderTitle: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    textAlign: 'center',
  },
});

export default AppSelectModal;
