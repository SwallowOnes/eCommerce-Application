import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Card, Typography, message } from 'antd';
import { IAddress } from '../../../../types/UserResponse';
import UserService from '../../../../models/Users/UserService';
import store from '../../../../redux/store';
import { getFullUserDataAsync } from '../../../../redux/slice/userSlice';

import styles from './addressCard.module.css';

const deleteAddress = (address: IAddress) => async () => {
  try {
    await UserService.deleteAddress(address._id);
    const getUserData = async () => {
      await store.dispatch(getFullUserDataAsync());
    };
    getUserData();
    message.success('Address was deleted!');
  } catch {
    message.error('Ooops.Something do wrong!');
  }
};

function AddressCard({
  address,
} // onEdit,
// handleDeleteAddress: handleDeleteAddres,
: {
  address: IAddress;
  // handleDeleteAddress: () => void;
  // onEdit: (addr: IAddress) => void;
}) {
  return (
    <Card
      className={styles.addressCard}
      actions={[
        <DeleteOutlined key="setting" onClick={deleteAddress(address)} />,
        <EditOutlined
          key="edit"
          //  onClick={() => onEdit(address)}
        />,
      ]}
    >
      <div className={styles.textHolder}>
        <GlobalOutlined style={{ marginRight: '0.5rem' }} />
        <Typography.Text className={styles.textCard} ellipsis>
          Country: {address.country}
        </Typography.Text>
      </div>
      <div className={styles.textHolder}>
        <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
        <Typography.Text className={styles.textCard} ellipsis>
          City: {address.city}
        </Typography.Text>
      </div>
      <div className={styles.textHolder}>
        <MailOutlined style={{ marginRight: '0.5rem' }} />
        <Typography.Text className={styles.textCard} ellipsis>
          Post Code: {address.postalCode}
        </Typography.Text>
      </div>
      <div className={styles.textHolder}>
        <HomeOutlined style={{ marginRight: '0.5rem' }} />
        <Typography.Text className={styles.textCard} ellipsis>
          Street: {address.street}
        </Typography.Text>
      </div>
    </Card>
  );
}

export default AddressCard;
