import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { getBillInvoice } from '@src/api/bills.api';
import queryKeys from '@src/api/constants/queryKeys';
import AppScreen from '@src/components/AppScreen';
import AppDetailCard, {
  AppDetailCardDetailItem,
} from '@src/components/common/AppDetailCard';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import { formatMoneyToTwoDecimals } from '@src/utils';
import { handleToastApiError } from '@src/utils/handleErrors';
import { dayJSFormatter } from '@src/utils/time';
import AppText from '@src/components/AppText';
import colors from '@src/configs/colors';
import fonts from '@src/configs/fonts';
import Size from '@src/utils/useResponsiveSize';
import AddMoneyHelpModal from '../../add-money/modals/AddMoneyHelpModal';
import { useAppStateStore } from '@src/stores/appState.store';
import AppRefreshControl from '@src/components/custom/AppRefreshControl';
import InformationRow from '@src/components/common/InformationRow';
import SubmitButton from '@src/components/forms/SubmitButton';
import { MaterialSymbolsPayments } from '@src/components/icons';
import { InvoiceStatusTypeData } from '@src/api/constants/default';
import routes from '@src/navigation/routes';
import AppSkeletonLoader from '@src/components/AppSkeletonLoader';

export interface BillInvoiceDetailsScreenProps {
  title: string;
  id: number;
}

type Props = AppScreenProps<'PAYMENT_INVOICE_DETAILS_SCREEN'>;

const PaymentInvoiceDetailsScreen = ({ route }: Props): React.JSX.Element => {
  const params = route?.params;
  const id = params?.id;
  const { setActiveModal } = useAppStateStore();
  const queryKey = [queryKeys.GET_BILLS_AND_COLLECTIONS, 'getBillInvoice', id];
  const queryClient = useQueryClient();
  const navigation = useAppNavigator();

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await getBillInvoice(id);
      if (response.ok) {
        return response?.data?.data;
      } else {
        handleToastApiError(response);
        return null;
      }
    },
    enabled: !!id && !isNaN(id),
  });

  const getTextColor = () => {
    if (data?.status === InvoiceStatusTypeData.Pending) {
      return colors.YELLOW_100;
    }
    if (data?.status === InvoiceStatusTypeData.Completed) {
      return colors.GREEN_100;
    }
    return colors.GRAY_100;
  };

  const handleRefetch = () => queryClient.resetQueries({ queryKey });

  const amountDue = formatMoneyToTwoDecimals({ amount: data?.amount || 0 });

  const detailList: AppDetailCardDetailItem = [
    [
      {
        title: 'INVOICE NUMBER',
        value: data?.invoiceNumber || '',
        isCopy: true,
      },
    ],

    [
      {
        title: 'AMOUNT DUE',
        value: amountDue,
      },
    ],
    [
      {
        title: 'ADDRESS',
        value: data?.address || '',
      },
    ],
    [
      {
        title: 'DATE CREATED',
        value: dayJSFormatter({
          value: data?.dateCreated || '',
          format: 'MMMM D, YYYY',
          shouldNotLocalize: true,
        }),
      },
      {
        title: 'DUE DATE',
        value: dayJSFormatter({
          value: data?.dueDate || '',
          format: 'MMMM D, YYYY',
          shouldNotLocalize: true,
        }),
      },
    ],
    [
      {
        title: 'START DATE',
        value: dayJSFormatter({
          value: data?.billStartDate || '',
          format: 'MMMM D, YYYY',
          shouldNotLocalize: true,
        }),
      },
      {
        title: 'END DATE',
        value: dayJSFormatter({
          value: data?.billEndDate || '',
          format: 'MMMM D, YYYY',
          shouldNotLocalize: true,
        }),
      },
    ],
    [
      {
        title: 'NEXT INSTALLMENT',
        value: dayJSFormatter({
          value: data?.nextInstallmentDate || '',
          format: 'MMMM D, YYYY',
          shouldNotLocalize: true,
        }),
      },
    ],

    [
      {
        title: 'PAYMENT METHOD',
        value: data?.paymentMethod || '-',
      },
      {
        title: 'DATE PAID',
        value:
          dayJSFormatter({
            value: data?.datePaid || '',
            format: 'MMMM D, YYYY',
            shouldNotLocalize: true,
          }) || '-',
      },
    ],
  ];

  const handleHelp = () => {
    setActiveModal({
      modalType: 'EMPTY_MODAL',
      shouldBackgroundClose: true,
      emptyModalComponent: <AddMoneyHelpModal />,
    });
  };

  return (
    <AppScreen showDownInset>
      <AppScreenHeader
        title={
          data?.billPurposeText
            ? `${data?.billPurposeText} Invoice`
            : params?.title
        }
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <AppRefreshControl refreshing={isLoading} onRefresh={handleRefetch} />
        }
      >
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <MaterialSymbolsPayments
              height={Size.calcAverage(22)}
              width={Size.calcAverage(22)}
              color={colors.GREEN_100}
            />
          </View>
          <View style={styles.headerContent}>
            {isLoading ? (
              <AppSkeletonLoader width={Size.getWidth() / 3} />
            ) : (
              <AppText style={{ fontFamily: fonts.INTER_600 }}>
                {data?.description}
              </AppText>
            )}

            <View style={styles.row}>
              {isLoading ? (
                <AppSkeletonLoader width={Size.getWidth() / 5} />
              ) : (
                <AppText style={styles.text}>{data?.billFrequencyText}</AppText>
              )}
              <View style={styles.divider} />
              {isLoading ? (
                <AppSkeletonLoader width={Size.getWidth() / 5} />
              ) : (
                <AppText style={[styles.text, { color: getTextColor() }]}>
                  {data?.statusText?.trim()}
                </AppText>
              )}
            </View>
          </View>
        </View>

        <AppDetailCard detailList={detailList} isLoading={isLoading} />

        <InformationRow
          style={styles.infoRow}
          title="A copy of this invoice has also been sent to your email."
        />

        <TouchableOpacity onPress={handleHelp} style={styles.issuesContainer}>
          <AppText style={styles.issuesText}>Have any issues? </AppText>
          <AppText style={[styles.issuesText, { color: colors.BLUE_200 }]}>
            Get Help
          </AppText>
        </TouchableOpacity>
      </ScrollView>

      {data?.status === InvoiceStatusTypeData.Pending && (
        <View style={styles.footer}>
          <SubmitButton
            title={`Pay ${amountDue}`}
            onPress={() =>
              navigation.navigate(routes.PAY_INVOICE_SCREEN, {
                dueAmount: data?.amount,
                invoiceId: id,
                purpose: data?.description,
                invoiceNumber: data?.invoiceNumber,
              })
            }
          />
        </View>
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Size.calcWidth(21),
    paddingTop: Size.calcHeight(21),
    paddingBottom: Size.calcHeight(40),
  },

  divider: {
    height: '70%',
    width: Size.calcWidth(1),
    backgroundColor: colors.GRAY_200,
  },

  footer: {
    paddingVertical: Size.calcHeight(20),
    borderTopColor: colors.LIGHT_GRAY_100,
    borderTopWidth: Size.calcAverage(1),
    paddingHorizontal: Size.calcWidth(21),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Size.calcHeight(20),
    borderTopWidth: Size.calcAverage(1),
    borderBottomWidth: Size.calcAverage(1),
    borderColor: colors.WHITE_300,
    paddingVertical: Size.calcHeight(16),
  },

  headerContent: {
    flexShrink: 1,
    width: '100%',
    rowGap: Size.calcHeight(4),
  },

  headerIconContainer: {
    aspectRatio: 1,
    height: Size.calcAverage(40),
    backgroundColor: colors.WHITE_300,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Size.calcWidth(12),
  },

  infoRow: {
    marginTop: Size.calcHeight(20),
    marginBottom: Size.calcHeight(24),
  },

  issuesContainer: {
    marginHorizontal: 'auto',
    paddingVertical: Size.calcHeight(5),
    marginVertical: Size.calcHeight(5),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Size.calcWidth(4),
  },

  issuesText: {
    fontFamily: fonts.INTER_500,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.calcWidth(7),
    flexWrap: 'wrap',
  },

  text: {
    color: colors.GRAY_100,
    fontSize: Size.calcAverage(12),
  },
});

export default PaymentInvoiceDetailsScreen;
