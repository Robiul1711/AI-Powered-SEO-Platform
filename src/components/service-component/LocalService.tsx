import CommonBusiness from "./local-service-components/CommonBusiness";
import LocalServiceBanner from "./local-service-components/LocalServiceBanner";

export default function LocalService() {
  return (
    <>
      <LocalServiceBanner />
      <CommonBusiness />
    </>
  );
}
