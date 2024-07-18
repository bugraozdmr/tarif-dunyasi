import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex justify-center align-middle mt-3">
      <Spinner label="Yükleniyor" color="secondary" labelColor="warning" />
    </div>
  );
};

export default Loading;
