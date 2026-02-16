import { useAppNavigator } from '@src/navigation/AppNavigator';
import SesaCommingSoonModal from '@src/modals/SesaCommingSoonModal';
import { useAppStateStore } from '@src/stores/appState.store';

import { allHubItems, ComingSoonTypes, HubItem, HubItemEnum } from './hubItems';
import { useHandlePanicAlert } from '@src/hooks';
import routes from '@src/navigation/routes';

export { allHubItems, HubItemEnum, quickActions } from './hubItems';

export type { ComingSoonTypes, HubItem } from './hubItems';

export const useAllHubItems = () => {
  const { setActiveModal } = useAppStateStore();
  const navigation = useAppNavigator();
  const { handlePanicAlertClick } = useHandlePanicAlert();

  const handleAction = (route: string | null) => {
    if (!route) return;
    navigation.navigate(route as any);
  };

  const handleComingSoon = (type: ComingSoonTypes) => {
    if (type === 'SESA Homes') {
      return setActiveModal({
        modalType: 'EMPTY_MODAL',
        emptyModalComponent: (
          <SesaCommingSoonModal
            details={[
              {
                title: 'For Tenants',
                description:
                  'Get an instant loan for rent and pay back monthly',
              },
              {
                title: 'For Propety Owners',
                description:
                  "Manage & list your property for sale, lease, rent or shortlet (air b'n'b)",
              },
            ]}
            hubItem={allHubItems[HubItemEnum.SESA_HOMES]}
          />
        ),
        shouldBackgroundClose: true,
      });
    }

    if (type === 'SESA Mall') {
      return setActiveModal({
        modalType: 'EMPTY_MODAL',
        emptyModalComponent: (
          <SesaCommingSoonModal
            details={[
              {
                description:
                  'List your product or service for residents in your estate and surrounding estates to patronize.',
              },
            ]}
            hubItem={allHubItems[HubItemEnum.SESA_MALL]}
          />
        ),
        shouldBackgroundClose: true,
      });
    }

    if (type === 'Insurance') {
      return setActiveModal({
        modalType: 'EMPTY_MODAL',
        emptyModalComponent: (
          <SesaCommingSoonModal
            details={[
              {
                description:
                  'Purchase motor, health, device and other household insurance products.',
              },
            ]}
            hubItem={allHubItems[HubItemEnum.INSURANCE]}
          />
        ),
        shouldBackgroundClose: true,
      });
    }
  };

  const newItems: HubItem[] = allHubItems.map(item => {
    if (item.route === null) {
      return {
        ...item,
        onPress: () => handleComingSoon(item.title as ComingSoonTypes),
      };
    } else if (item.route === routes.PANIC_ALERT_SCREEN) {
      return { ...item, onPress: handlePanicAlertClick };
    } else {
      return { ...item, onPress: () => handleAction(item.route) };
    }
  });

  const myHubData: HubData[] = [
    {
      title: 'General',
      sections: [
        [
          newItems[HubItemEnum.BOOK_VISITOR],
          newItems[HubItemEnum.CREATE_EVENTS],
          newItems[HubItemEnum.GROUP_ACCESS],
        ],
        [
          newItems[HubItemEnum.BILLS_AND_COLLECTIONS],
          newItems[HubItemEnum.BUY_POWER],
          newItems[HubItemEnum.EMPTY_ITEM],
        ],
      ],
    },

    {
      title: 'Others',
      sections: [
        [
          newItems[HubItemEnum.PANIC_ALERT],
          newItems[HubItemEnum.HIRE_ARTISAN],
          newItems[HubItemEnum.POLL_AND_ELECTION],
        ],
      ],
    },
    {
      title: 'Coming Soon',
      sections: [
        [
          newItems[HubItemEnum.SESA_MALL],
          newItems[HubItemEnum.INSURANCE],
          newItems[HubItemEnum.SESA_HOMES],
        ],
      ],
    },
  ];

  const quickActions: HubItem[] = [
    newItems[HubItemEnum.PANIC_ALERT],
    newItems[HubItemEnum.BOOK_VISITOR],
    newItems[HubItemEnum.CREATE_EVENTS],
    newItems[HubItemEnum.GROUP_ACCESS],
    newItems[HubItemEnum.BILLS_AND_COLLECTIONS],
  ];

  return { myHubData, quickActions };
};

interface HubData {
  title: string;
  sections: HubItem[][];
}
