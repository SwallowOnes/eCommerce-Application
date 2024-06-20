import { AxiosError } from 'axios';
import { Button, Form, Spin, message } from 'antd';
import { useState } from 'react';
import UserService from '../../../models/Users/UserService';
import { IAddress } from '../../../types/UserResponse';
import AddNewAddressForm from './subComponents/addAddressForm';
import store from '../../../redux/store';
import { getFullUserDataAsync } from '../../../redux/slice/userSlice';

interface ICreatePayload {
  new: {
    isDefault: boolean;
    _id: '';
    country: '';
    city: '';
    street: '';
    postalCode: '';
  };
  payload: { billingAddresses: IAddress[] };
}

function AddAddressForm({ data }: { data: IAddress[] }) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultBilling, setDefaultBilling] = useState(false);

  function createPayload(formData: IAddress[]): ICreatePayload {
    const newItems = formData[0];
    const rest = formData.slice(1);
    const returnData = {
      new: { ...newItems, isDefault: defaultBilling },
      payload: {
        billingAddresses: rest.map((obj) => {
          if (defaultBilling === true && 'isDefault' in obj) {
            obj.isDefault = false;
          }
          return obj;
        }),
      },
    };
    return returnData;
  }

  const handleAddAddress = async () => {
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      setIsLoading(true);
      data.unshift(formData);
      const newPayload = createPayload(data);
      await UserService.updateBillingAddress(newPayload.payload);
      await UserService.createBillingAddress(newPayload.new);
      const getUserData = async () => {
        await store.dispatch(getFullUserDataAsync());
      };
      getUserData();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        message.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading} style={{ width: '212px' }}>
      <Form layout="vertical" form={form} style={{ marginTop: '1.5rem' }}>
        <AddNewAddressForm setData={setDefaultBilling} />
        <Button htmlType="submit" onClick={() => handleAddAddress()} block>
          CREATE ADDRESS
        </Button>
      </Form>
    </Spin>
  );
}

export default AddAddressForm;
