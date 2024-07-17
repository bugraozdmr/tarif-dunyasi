import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex justify-center align-middle mt-40">
      <Spinner label="Yükleniyor" color="warning" labelColor="warning" />
    </div>
  );
};

export default Loading;
