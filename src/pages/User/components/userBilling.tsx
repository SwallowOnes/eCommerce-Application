import { useEffect, useState } from 'react';
import { Badge, Button, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import styles from './userAddresses.module.css';
import UserService from '../../../models/Users/UserService';
import { RootState } from '../../../redux/store';
import { IAddress } from '../../../types/UserResponse';

import AddressCard from './subComponents/addressCard';
import AddAddressForm from './addAddress';

function UserBilling() {
  const userFullData = useSelector((state: RootState) => state.user.userFull);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAddAddressOpen, setIsModalAddAddressOpen] = useState(false);
  const [billingAddress, setBillingAddress] = useState([
    {
      _id: '',
      country: '',
      city: '',
      street: '',
      postalCode: '',
      isDefault: false,
    },
  ] as IAddress[]);

  useEffect(() => {
    async function getUserData() {
      const billingResponse = await UserService.getBillingAddress(
        userFullData.billingAddress,
      );
      const billingData = billingResponse.data;
      setIsLoading(false);
      setBillingAddress(billingData);
    }
    getUserData();
  }, [setBillingAddress, userFullData.billingAddress]);

  return (
    <>
      <Spin spinning={isLoading}>
        <h3>BILLING ADDRESSES</h3>
        <div className={styles.userPersCont}>
          <Button
            type="dashed"
            onClick={() => {
              setIsModalAddAddressOpen(true);
            }}
            className={styles.addButton}
          >
            <PlusOutlined /> ADD NEW ADDRESS
          </Button>
          {billingAddress.map((address: IAddress) =>
            address.isDefault ? (
              <Badge.Ribbon text="Default address" key={address._id}>
                <AddressCard key={address._id} address={address} />
              </Badge.Ribbon>
            ) : (
              <AddressCard key={address._id} address={address} />
            ),
          )}
        </div>
      </Spin>
      <Modal
        title="Edit Address"
        open={isModalAddAddressOpen}
        onCancel={() => setIsModalAddAddressOpen(false)}
        footer=""
      >
        <AddAddressForm data={billingAddress} />
      </Modal>
    </>
  );
}

export default UserBilling;
