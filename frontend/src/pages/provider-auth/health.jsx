import ProviderVerify from "./ProviderVerify";
import { styles } from "./health_style";

const ProviderHealth = () => (
  <ProviderVerify
    title="CityCare Hospital Verification"
    subtitle="Secure biometric verification with live liveness detection"
    scope="health"
    styles={styles}
  />
);

export default ProviderHealth;
