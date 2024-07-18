import { Spinner } from "@nextui-org/react";

const ClientLoading = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <Spinner label="Yükleniyor" color="primary" labelColor="warning" />
    </div>
  );
};

export default ClientLoading;
