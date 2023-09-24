/* eslint-disable react/prop-types */
import { colors } from '../../assets/theme/theme';

const CustomFormLabel = ({ label, required }) => {
  return (
    <label style={{ color: colors.black, fontWeight: 500, fontSize: '16px' }}>
      {label} {required && <span style={{ color: colors.red[800] }}>*</span>}
    </label>
  );
};

export default CustomFormLabel;
