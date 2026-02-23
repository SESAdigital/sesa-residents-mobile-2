import { Activity, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppScreen from '@src/components/AppScreen';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import SubmitButton from '@src/components/forms/SubmitButton';
import colors from '@src/configs/colors';
import Size from '@src/utils/useResponsiveSize';
import EventTypeStep from './steps/EventTypeStep';

const CreateEventsScreen = (): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(
    CreateEventSteps.EVENT_TYPE_STEP,
  );

  const steps = [
    {
      component: <EventTypeStep />,
    },
  ];

  return (
    <AppScreen showDownInset>
      <AppScreenHeader title="Create Event" />
      <View style={styles.indicatorContainer}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View style={styles.indicator} key={index} />
        ))}
      </View>
      <ScrollView>
        {steps?.map((step, index) => (
          <Activity
            key={index}
            mode={currentStep === index + 1 ? 'visible' : 'hidden'}
          >
            {step?.component}
          </Activity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <SubmitButton
          style={{ width: '46%' }}
          title="Cancel"
          variant="SECONDARY"
          onPress={() => {}}
        />
        <SubmitButton
          style={{ width: '46%' }}
          title="Continue"
          onPress={() => {}}
        />
      </View>
    </AppScreen>
  );
};

enum CreateEventSteps {
  EVENT_TYPE_STEP = 1,
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Size.calcHeight(17),
    paddingHorizontal: Size.calcWidth(21),
    borderTopWidth: Size.calcAverage(1),
    borderTopColor: colors.WHITE_300,
  },

  indicator: {
    flex: 1,
    height: Size.calcHeight(4),
    borderRadius: Size.calcWidth(4),
    backgroundColor: colors.GREEN_600,
  },

  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: Size.calcWidth(16),
    paddingHorizontal: Size.calcWidth(21),
    paddingVertical: Size.calcHeight(10),
    borderBottomWidth: Size.calcHeight(1),
    borderBottomColor: colors.WHITE_300,
  },
});

export default CreateEventsScreen;
