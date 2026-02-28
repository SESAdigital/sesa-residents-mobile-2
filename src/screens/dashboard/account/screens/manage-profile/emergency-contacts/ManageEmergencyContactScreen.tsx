import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from 'apisauce';
import Joi from 'joi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';

import { joiResolver } from '@hookform/resolvers/joi';
import { GenericApiResponse } from '@src/api/base.api';
import { ALL_RELATIONSHIP_TYPES } from '@src/api/constants/data';
import {
  GenderTypeData,
  RelationshipType,
  RelationshipTypeData,
} from '@src/api/constants/default';
import queryKeys from '@src/api/constants/queryKeys';
import {
  patchEmergencyContact,
  postEmergencyContact,
  PostEmergencyContactReq,
} from '@src/api/profile.api';
import AppScreen from '@src/components/AppScreen';
import AppText from '@src/components/AppText';
import AppScreenHeader from '@src/components/common/AppScreenHeader';
import InformationRow from '@src/components/common/InformationRow';
import AppPhoneInput from '@src/components/forms/AppPhoneInput';
import AppSelectInput from '@src/components/forms/AppSelectInput';
import AppTextInput from '@src/components/forms/AppTextInput';
import SubmitButton from '@src/components/forms/SubmitButton';
import fonts from '@src/configs/fonts';
import { useGetSingleEmergencyContact } from '@src/hooks/useGetRequests';
import AppLoadingModal from '@src/modals/AppLoadingModal';
import { AppScreenProps, useAppNavigator } from '@src/navigation/AppNavigator';
import { appToast } from '@src/utils/appToast';
import { handleToastApiError } from '@src/utils/handleErrors';
import { joiSchemas } from '@src/utils/schema';
import Size from '@src/utils/useResponsiveSize';

const schema = Joi.object<PostEmergencyContactReq>({
  email: joiSchemas.email.optional().allow(''),
  phoneNumber: joiSchemas.phone.label('Phone Number'),
  firstName: joiSchemas.name.label('First name'),
  lastName: joiSchemas.name.label('Last name'),
  relationship: Joi.string().required(),
});

const femaleGenderRelations: RelationshipType[] = [
  RelationshipTypeData.Mother,
  RelationshipTypeData.Sister,
  RelationshipTypeData.Daughter,
];

type Props = AppScreenProps<'MANAGE_EMERGENCY_CONTACT_SCREEN'>;

const ManageEmergencyContactScreen = ({ route }: Props): React.JSX.Element => {
  const param = route?.params;
  const isEdit = !!param?.id;
  const { data, isLoading: isEmergencyContactLoading } =
    useGetSingleEmergencyContact(param?.id || 0);

  const navigation = useAppNavigator();
  const postEmergencyContactAPI = useMutation({
    mutationFn: postEmergencyContact,
  });
  const patchEmergencyContactAPI = useMutation({
    mutationFn: patchEmergencyContact,
  });
  const queryClient = useQueryClient();
  const { handleSubmit, control, setValue, getValues } =
    useForm<PostEmergencyContactReq>({
      resolver: joiResolver(schema),
    });

  useEffect(() => {
    const { email, phoneNumber } = getValues();
    if (!!data?.email && isEdit && !email && !phoneNumber) {
      setValue('email', data?.email?.trim()?.toLowerCase());
      setValue('phoneNumber', data?.phoneNumber?.trim());
      setValue('firstName', data?.firstName?.trim());
      setValue('lastName', data?.lastName?.trim());
      setValue(
        'relationship',
        data?.relationship?.toString() as unknown as RelationshipType,
      );
    }
  }, [data?.email, isEdit]);

  const onSubmit = handleSubmit(async data => {
    const relationship = Number(data?.relationship) as RelationshipType;
    const formattedData: PostEmergencyContactReq = {
      email: data?.email?.trim()?.toLowerCase(),
      firstName: data?.firstName?.trim(),
      lastName: data?.lastName?.trim(),
      phoneNumber: data?.phoneNumber?.trim(),
      relationship,
      gender: femaleGenderRelations.includes(relationship)
        ? GenderTypeData.Female
        : GenderTypeData.Male,
    };

    let response: ApiResponse<GenericApiResponse, GenericApiResponse> | null =
      null;

    if (isEdit) {
      response = await patchEmergencyContactAPI.mutateAsync({
        id: param?.id,
        value: formattedData,
      });
    } else {
      response = await postEmergencyContactAPI.mutateAsync(formattedData);
    }
    if (response?.ok) {
      appToast.Success(
        response?.data?.message ||
          `Emergency contact ${isEdit ? 'updated' : 'added'} successfully`,
      );
      queryClient.resetQueries({
        queryKey: [queryKeys.GET_EMERGENCY_CONTACTS],
      });
      navigation.goBack();
    } else {
      handleToastApiError(response);
    }
  });

  const isLoading =
    postEmergencyContactAPI.isPending || patchEmergencyContactAPI.isPending;

  return (
    <AppScreen showDownInset>
      <AppLoadingModal
        isLoading={isLoading || isEmergencyContactLoading}
        title={
          isEmergencyContactLoading ? 'Fetching details...' : 'Please wait...'
        }
      />
      <AppScreenHeader containerStyle={styles.header} />

      <View style={styles.container}>
        <ScrollView style={{ paddingHorizontal: Size.calcWidth(21) }}>
          <AppText style={styles.title}>
            {isEdit ? 'Edit' : 'Add'} Emergency contacts
          </AppText>
          <AppText style={{ paddingBottom: Size.calcHeight(30) }}>
            Fill in the form below and save changes to {isEdit ? 'edit' : 'add'}{' '}
            this contact.
          </AppText>

          <View style={{ rowGap: Size.calcHeight(28) }}>
            <View style={styles.row}>
              <AppTextInput
                editable={!isLoading}
                placeholder="First Name"
                label="First Name"
                style={{ width: '46%' }}
                control={control}
                name="firstName"
              />
              <AppTextInput
                editable={!isLoading}
                style={{ width: '46%' }}
                placeholder="Last Name"
                label="Last Name"
                control={control}
                name="lastName"
              />
            </View>
            <AppPhoneInput
              placeholder="Phone Number"
              label="Phone Number"
              control={control}
              name="phoneNumber"
              isDisabled={isLoading}
            />

            <AppTextInput
              editable={!isLoading}
              placeholder="Email Address"
              label="Email Address"
              control={control}
              name="email"
              keyboardType="email-address"
            />

            <AppSelectInput
              control={control}
              disabled={isLoading}
              data={ALL_RELATIONSHIP_TYPES}
              label="Select Relationship"
              placeholder="Relationship"
              name="relationship"
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <InformationRow title="This info will be used for its intended purpose and will not be shared with any 3rd parties." />
          <SubmitButton
            title={`${isEdit ? 'Edit' : 'Add'} Emergency Contact`}
            onPress={onSubmit}
          />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Size.calcHeight(51),
  },

  footer: {
    paddingHorizontal: Size.calcWidth(21),
    rowGap: Size.calcHeight(24),
  },

  header: {
    paddingTop: Size.calcHeight(27),
    paddingBottom: Size.calcHeight(35),
    borderBottomWidth: 0,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: fonts.INTER_600,
    fontSize: Size.calcAverage(24),
    paddingBottom: Size.calcHeight(12),
  },
});

export default ManageEmergencyContactScreen;
