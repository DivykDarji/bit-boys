import ProviderVerify from "./ProviderVerify";
import { styles } from "./farm_style";

const ProviderFarm = () => (
  <ProviderVerify
    title="National Agriculture Registry"
    subtitle="Verify your identity for farmer authorization"
    scope="farm"
    styles={styles}
  />
);

export default ProviderFarm;
