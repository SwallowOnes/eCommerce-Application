import { Checkbox, Form, Input, Select } from "antd";

import styles from '../../../SignUp/components/addressesForm.module.css';

const countries = [
  { value: 'belarus', label: 'Belarus' },
  { value: 'kazakhstan', label: 'Kazakhstan' },
  { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'russia', label: 'Russia' },
  { value: 'tajikistan', label: 'Tajikistan' },
  { value: 'turkmenistan', label: 'Turkmenistan' },
  { value: 'uzbekistan', label: 'Uzbekistan' },
];

const { Option } = Select;

function addNewAddressForm({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  return (
  <>
    <div className={styles.NameCont}>
      <p className={styles.NameContText}>Country</p>
      <Form.Item
        name="country"
        rules={[
          {
            required: true,
            message: 'Please select your country!',
          },
        ]}
      >
        <Select
          size="large"
          placeholder="Select your country"
          optionFilterProp="children"
          filterOption={(input, option) => {
            if (
              option &&
              option.children &&
              option.children instanceof String
            ) {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                0
              );
            }
            return false;
          }}
        >
          {countries.map((country) => (
            <Option key={country.value} value={country.value}>
              {country.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
    <div className={styles.NameCont}>
      <p className={styles.NameContText}>City</p>
      <Form.Item
        name="city"
        rules={[
          {

            message: 'Please enter your city!',
          },
          {
            pattern: /^[a-zA-Z\s]+$/,
            message: 'City must contain only alphabets and spaces!',
          },
        ]}
      >
        <Input className={styles.NameContInput}  />
      </Form.Item>
    </div>
    <div className={styles.NameCont}>
      <p className={styles.NameContText}>Street</p>
      <Form.Item
        name="street"
        rules={[
          {

            message: 'Please enter your street!',
          },
          {
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Street must contain only alphabets and spaces!',
          },
        ]}
      >
        <Input className={styles.NameContInput} />
      </Form.Item>
    </div>
    <div className={styles.NameCont}>
      <p className={styles.NameContText}>Postal code</p>
      <Form.Item
        name="postalCode"
        rules={[
          {

            message: 'Please enter your postal code!',
          },
          {
            pattern: /^[0-9]{6}$/,
            message: 'Postal code should be 6 digits.',
          },
        ]}
      >
        <Input className={styles.NameContInput}  />
      </Form.Item>
      <Checkbox
          className={styles.checkBox}
          onChange={(e) => setData(e.target.checked)}
        >
          Set as default shipping address
        </Checkbox>
    </div>
  </>
)};

export default addNewAddressForm;