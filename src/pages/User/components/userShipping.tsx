import { useEffect, useState } from 'react';
import { Badge, Button, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import styles from './userAddresses.module.css';
import UserService from '../../../models/Users/UserService';
import { RootState } from '../../../redux/store';
import { IAddress } from '../../../types/UserResponse';

import AddressCard from './subComponents/addressCard';
import AddAddress from './addAddress';

function Usershipping() {
  const userFullData = useSelector((state: RootState) => state.user.userFull);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAddAddressOpen, setIsModalAddAddressOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState([
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
      const shippingResponse = await UserService.getShippingAddress(
        userFullData.shippingAddress,
      );
      const shippingData = shippingResponse.data;
      setIsLoading(false);
      setShippingAddress(shippingData);
    }
    getUserData();
  }, [setShippingAddress, userFullData.shippingAddress]);

  return (
    <>
      <Spin spinning={isLoading}>
        <h3>SHIPPING ADDRESSES</h3>
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
          {shippingAddress.map((address: IAddress) =>
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
        <AddAddress data={shippingAddress} />
      </Modal>
    </>
  );
}

export default Usershipping;
