import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Source } from 'react-native-fast-image';

import {
  EventDetailsType,
  EventDetailsTypeData,
} from '@src/api/constants/default';
import BusinessAndProductIcon from '@src/assets/images/icons/business-and-product-events-icon.png';
import CelebratoryIcon from '@src/assets/images/icons/celebratory-icon.png';
import CommunityAndSocialIcon from '@src/assets/images/icons/community-and-social-events-icon.png';
import CulturalAndEntertainmentIcon from '@src/assets/images/icons/cultural-and-entertainment-icon.png';
import EducationalAndProfessionalIcon from '@src/assets/images/icons/educational-and-professional-icon.png';
import ReligiousAndSpiritualIcon from '@src/assets/images/icons/religious-and-spiritual-events-icon.png';
import ShortletBookingNormalStayIcon from '@src/assets/images/icons/shortlet -booking-event-normal-stay-icon.png';
import ShortletBookingPartyBookingIcon from '@src/assets/images/icons/shortlet-booking-event-party-booking-icon.png';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import AppCircularCheckIcon from '@src/components/custom/AppCircularCheckIcon';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';

interface EventTypes {
  id: EventDetailsType;
  title: string;
  icon: Source;
  description: string;
}

const eventTypes: EventTypes[][] = [
  [
    {
      id: EventDetailsTypeData.ShortletBookingNormalStay,
      title: 'Shortlet Booking Event (normal stay)',
      icon: ShortletBookingNormalStayIcon,
      description:
        'Short-term rental for guests seeking temporary accommodation.',
    },
    {
      id: EventDetailsTypeData.ShortletBookingPartyBooking,
      title: 'Shortlet Booking Event (party booking)',
      icon: ShortletBookingPartyBookingIcon,
      description:
        'Short-term rental specifically for hosting events or gatherings.',
    },
  ],

  [
    {
      id: EventDetailsTypeData.Celebratory,
      title: 'Celebratory',
      icon: CelebratoryIcon,
      description:
        'Birthday, award, EOY, anniversary, house party, Block Party, etc.',
    },
    {
      id: EventDetailsTypeData.CulturalandEntertainment,
      title: 'Cultural and Entertainment',
      icon: CulturalAndEntertainmentIcon,
      description:
        'Art show, concert, fashion show, carnival, festival, Exhibition, etc.',
    },
  ],

  [
    {
      id: EventDetailsTypeData.EducationalandProfessional,
      title: 'Educational and Professional',
      icon: EducationalAndProfessionalIcon,
      description: 'Educational Conference, Contest, Lecture, Seminar, etc.',
    },
    {
      id: EventDetailsTypeData.CommunityandSocialEvents,
      title: 'Community and Social Events',
      icon: CommunityAndSocialIcon,
      description: 'Fundraiser, Roadshow, School event, Reunion, Picnic, etc.',
    },
  ],

  [
    {
      id: EventDetailsTypeData.ReligiousandSpiritualEvents,
      title: 'Religious and Spiritual Events',
      icon: ReligiousAndSpiritualIcon,
      description: 'Religious event, Retreat, Religious conferences, etc.',
    },
    {
      id: EventDetailsTypeData.BusinessandProductEvents,
      title: 'Business and Product Events',
      icon: BusinessAndProductIcon,
      description: 'Product launch, Reception, Business Conferences, etc.',
    },
  ],
];

interface Props {
  selectedType: EventDetailsType;
  setSelectedType: (type: EventDetailsType) => void;
}

const EventTypeStep = (props: Props): React.JSX.Element => {
  const { selectedType, setSelectedType } = props;

  return (
    <View style={styles.container}>
      <AppText style={{ fontFamily: fonts.INTER_600 }}>
        Select event type
      </AppText>
      <AppText style={styles.subTitle}>
        Choose one that best describes your event
      </AppText>

      <View style={{ rowGap: Size.calcHeight(12) }}>
        {eventTypes?.map((item, index) => (
          <View style={styles.itemRow} key={index}>
            {item?.map((value, secondIndex) => {
              const isSelected = selectedType === value?.id;
              return (
                <TouchableOpacity
                  onPress={() => !isSelected && setSelectedType(value?.id)}
                  style={[styles.item, isSelected && styles.itemSelected]}
                  key={secondIndex}
                >
                  <View style={styles.itemHeader}>
                    <AppImage source={value?.icon} style={styles.itemImage} />
                    <AppCircularCheckIcon isChecked={isSelected} />
                  </View>
                  <AppText style={styles.itemTitle}>{value?.title}</AppText>
                  <AppText style={{ fontSize: Size.calcAverage(12) }}>
                    {value.description}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Size.calcHeight(16),
    paddingBottom: Size.calcHeight(6),
    paddingHorizontal: Size.calcWidth(21),
  },

  item: {
    width: '47%',
    borderWidth: Size.calcAverage(1.5),
    borderColor: colors.LIGHT_GRAY_100,
    borderRadius: Size.calcWidth(8),
    padding: Size.calcAverage(16),
    backgroundColor: colors.WHITE_200,
    shadowColor: colors.LIGHT_GRAY_100,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemImage: {
    height: Size.calcAverage(40),
    aspectRatio: 1,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemSelected: {
    // borderWidth: Size.calcAverage(1.5),
    shadowColor: colors.BLUE_160,
    borderColor: colors.BLUE_200,
  },

  itemTitle: {
    paddingVertical: Size.calcHeight(8),
    fontFamily: fonts.INTER_600,
  },

  subTitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(25),
  },
});

export default EventTypeStep;
