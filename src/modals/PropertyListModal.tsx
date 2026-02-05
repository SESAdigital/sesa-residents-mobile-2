import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@src/components/AppText';
import { MaterialSymbolsHome } from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import AppModalContainer from '@src/modals/AppModalContainer';
import Size from '@src/utils/useResponsiveSize';

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface Property {
  id: string;
  name: string;
  address: string;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    name: '5-Bedroom Modern Duplex',
    address: '6:16, Wesley Close, Friends Colony...',
  },
  {
    id: '2',
    name: '3-Bedroom Maisonette',
    address: '5:15, Montgomery Close, Friends Colony...',
  },
];

const PropertyListModal = ({ visible, onClose }: Props): React.ReactNode => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('2');

  const handleSwitch = () => {
    // Implement switch logic here
    onClose();
  };

  return (
    <AppModalContainer visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {/* Using text X as placeholder for close icon if not available */}
            <AppText style={styles.closeIcon}>✕</AppText>
          </TouchableOpacity>
          <AppText style={styles.title}>Switch Property</AppText>
          <View style={{ width: Size.calcWidth(20) }} />
        </View>

        <View style={styles.listContainer}>
          {MOCK_PROPERTIES.map(property => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyItem}
              onPress={() => setSelectedPropertyId(property.id)}
            >
              <View style={styles.iconContainer}>
                <MaterialSymbolsHome
                  color={colors.GRAY_100}
                  height={Size.calcAverage(20)}
                  width={Size.calcAverage(20)}
                />
              </View>
              <View style={styles.textContainer}>
                <AppText style={styles.propertyName}>{property.name}</AppText>
                <AppText style={styles.propertyAddress} numberOfLines={1}>
                  {property.address}
                </AppText>
              </View>
              <View style={styles.radioContainer}>
                <View
                  style={[
                    styles.radioOuter,
                    selectedPropertyId === property.id &&
                      styles.radioOuterSelected,
                  ]}
                >
                  {selectedPropertyId === property.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <AppText style={styles.cancelButtonText}>Cancel</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
            <AppText style={styles.switchButtonText}>Switch</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </AppModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_100,
    width: '90%',
    borderRadius: Size.calcAverage(16),
    overflow: 'hidden',
    paddingBottom: Size.calcHeight(24),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Size.calcWidth(16),
    paddingVertical: Size.calcHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY_400, // Assuming a light border color
  },
  closeIcon: {
    fontSize: Size.calcAverage(18),
    color: colors.BLACK_100,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(16),
    color: colors.BLACK_100,
  },
  listContainer: {
    paddingVertical: Size.calcHeight(8),
  },
  propertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.calcHeight(12),
    paddingHorizontal: Size.calcWidth(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY_200,
  },
  iconContainer: {
    marginRight: Size.calcWidth(12),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  propertyName: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(14),
    color: colors.BLACK_100,
    marginBottom: Size.calcHeight(4),
  },
  propertyAddress: {
    fontFamily: fonts.INTER_400,
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
  },
  radioContainer: {
    marginLeft: Size.calcWidth(12),
  },
  radioOuter: {
    width: Size.calcAverage(20),
    height: Size.calcAverage(20),
    borderRadius: Size.calcAverage(10),
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.BLUE_600,
  },
  radioInner: {
    width: Size.calcAverage(10),
    height: Size.calcAverage(10),
    borderRadius: Size.calcAverage(5),
    backgroundColor: colors.BLUE_600,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Size.calcWidth(16),
    paddingTop: Size.calcHeight(24),
    justifyContent: 'space-between',
    gap: Size.calcWidth(16),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: Size.calcHeight(12),
    borderRadius: Size.calcAverage(24),
    backgroundColor: colors.LIGHT_GRAY_200, // Ghost button style
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(14),
    color: colors.BLACK_100,
  },
  switchButton: {
    flex: 1,
    paddingVertical: Size.calcHeight(12),
    borderRadius: Size.calcAverage(24),
    backgroundColor: colors.BLUE_600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButtonText: {
    fontFamily: fonts.INTER_500,
    fontSize: Size.calcAverage(14),
    color: colors.WHITE_100,
  },
});

export default PropertyListModal;
