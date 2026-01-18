import ProviderVerify from "./ProviderVerify";
import { cityStyles as styles } from "./cityStyles";

const ProviderCity = () => (
  <ProviderVerify
    title="Smart City Authority"
    subtitle="Resident biometric authorization portal"
    scope="city"
    styles={styles}
  />
);

export default ProviderCity;
