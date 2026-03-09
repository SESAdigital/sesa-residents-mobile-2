import { UseFormReturn } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';

import { PostEventReq } from '@src/api/events.api';
import AppImage from '@src/components/AppImage';
import AppText from '@src/components/AppText';
import AppDateInput from '@src/components/forms/AppDateInput';
import {
  MaterialSymbolsAddAPhoto,
  MaterialSymbolsDeleteOutline,
} from '@src/components/icons';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import AppActionsModal from '@src/modals/AppActionsModal';
import { useAppStateStore } from '@src/stores/appState.store';
import { defaultSelectImageOptions } from '@src/utils/imageSelect';
import Size from '@src/utils/useResponsiveSize';
import AppTextInput from '@src/components/forms/AppTextInput';

interface Props {
  form: UseFormReturn<PostEventReq, any, PostEventReq>;
}

const MAX_IMAGES = 1;

const EventDetailsStep = ({ form }: Props): React.JSX.Element => {
  const { setActiveModal } = useAppStateStore();
  const {
    watch,
    setValue,
    setError,
    control,
    formState: { errors },
  } = form;
  const [startDate, startTime, endDate, endTime, images] = watch([
    'StartDate',
    'StartTime',
    'EndDate',
    'EndTime',
    'Images',
  ]);

  const itemsLeft = MAX_IMAGES - (images?.length || 0);

  const handleAdd = (res: ImagePickerResponse | null) => {
    if (res?.assets) {
      if (images) {
        setValue('Images', [...images, ...res?.assets?.slice(0, itemsLeft)]);
      } else {
        setValue('Images', [...res?.assets?.slice(0, itemsLeft)]);
      }
    }
  };

  const handleDelete = (uri?: string) => {
    if (uri) {
      setValue(
        'Images',
        images?.filter(val => val?.uri !== uri),
      );
    }
  };

  const actions = defaultSelectImageOptions({ handleAdd, itemsLeft });

  const handleModal = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AppActionsModal actions={actions} />,
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={{ fontFamily: fonts.INTER_600 }}>Event Details</AppText>
      <AppText style={styles.subtitle}>
        Try to be as descriptive as possible
      </AppText>

      <AppTextInput
        control={control}
        name="Name"
        placeholder="Name of event"
        label="Name of event"
        description="Use a name that is clear & descriptive."
      />

      <View style={styles.dateContainer}>
        <AppDateInput
          errorMessage={errors?.StartDate?.message || ''}
          label="Start Date"
          mode="date"
          minimumDate={new Date()}
          value={startDate}
          setValue={value => {
            if (errors?.StartDate?.message)
              setError('StartDate', { message: undefined });
            setValue('StartDate', value);
          }}
          placeholder="Start Date"
        />

        <AppDateInput
          errorMessage={errors?.StartTime?.message || ''}
          label="Start Time"
          mode="time"
          value={startTime || ''}
          setValue={value => {
            if (errors?.StartTime?.message)
              setError('StartTime', { message: undefined });
            setValue('StartTime', value);
          }}
          placeholder="Start Time"
        />
      </View>
      <View style={styles.dateContainer}>
        <AppDateInput
          errorMessage={errors?.EndDate?.message || ''}
          label="End Date"
          mode="date"
          minimumDate={new Date(startDate)}
          value={endDate}
          setValue={value => {
            if (errors?.EndDate?.message)
              setError('EndDate', { message: undefined });
            setValue('EndDate', value);
          }}
          placeholder="End Date"
        />

        <AppDateInput
          errorMessage={errors?.EndTime?.message || ''}
          label="End Time"
          mode="time"
          value={endTime || ''}
          setValue={value => {
            if (errors?.EndTime?.message)
              setError('EndTime', { message: undefined });
            setValue('EndTime', value);
          }}
          placeholder="End Time"
        />
      </View>

      <AppText style={styles.headerText}>Add event poster (Optional)</AppText>
      <AppText style={styles.headerDescription}>
        You can only add one poster.
      </AppText>

      <View
        style={[
          styles.imagesContainer,
          images && images?.length > 1 && { justifyContent: 'space-between' },
        ]}
      >
        {(!images || (!!images && images?.length < MAX_IMAGES)) && (
          <TouchableOpacity
            onPress={handleModal}
            style={[styles.imageDimensions, styles.imageAdd]}
          >
            <MaterialSymbolsAddAPhoto
              height={Size.calcAverage(24)}
              width={Size.calcAverage(24)}
              color={colors.BLUE_200}
            />
            <AppText style={styles.addText}>Add Photo</AppText>
          </TouchableOpacity>
        )}
        {images?.map(({ uri }, key) => (
          <TouchableOpacity
            onPress={() => handleDelete(uri)}
            style={styles.imageDimensions}
            key={key}
          >
            <View style={styles.imageOverlay}>
              <MaterialSymbolsDeleteOutline
                height={Size.calcAverage(24)}
                width={Size.calcAverage(24)}
                color={colors.WHITE_200}
              />
            </View>
            <AppImage source={{ uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addText: {
    fontSize: Size.calcAverage(12),
    fontFamily: fonts.INTER_500,
    color: colors.BLUE_200,
    paddingTop: Size.calcHeight(4),
  },

  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(16),
  },

  dateContainer: {
    flexDirection: 'row',
    gap: Size.calcWidth(23),
    alignItems: 'flex-end',
    paddingTop: Size.calcHeight(16),
  },

  headerDescription: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingBottom: Size.calcHeight(25),
  },

  headerText: {
    fontFamily: fonts.INTER_600,
    paddingTop: Size.calcHeight(32),
    paddingBottom: Size.calcHeight(4),
  },

  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },

  imageDimensions: {
    aspectRatio: 1,
    width: '40%',
    borderRadius: Size.calcAverage(8),
    position: 'relative',
    overflow: 'hidden',
  },

  imageAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Size.calcAverage(1),
    borderStyle: 'dashed',
    borderColor: colors.BLUE_200,
  },

  imagesContainer: {
    flexDirection: 'row',
    columnGap: Size.calcWidth(11),
    alignItems: 'center',
  },

  imageOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.GRAY_800,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subtitle: {
    fontSize: Size.calcAverage(12),
    color: colors.GRAY_100,
    paddingTop: Size.calcHeight(4),
    paddingBottom: Size.calcHeight(25),
  },
});

export default EventDetailsStep;
