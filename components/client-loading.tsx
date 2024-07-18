import { Spinner } from "@nextui-org/react";

{/*className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" */}
const ClientLoading = () => {
  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <Spinner label="Yükleniyor" color="primary" labelColor="warning" />
    </div>
  );
};

export default ClientLoading;
