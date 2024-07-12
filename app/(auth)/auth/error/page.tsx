import { CardWrapper } from "@/components/auth/card-wrapper";
import { TriangleAlert } from "lucide-react"; 

const AuthErrorPage = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong !"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      <div className="w-full flex justify-center items-center">
        <TriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default AuthErrorPage;
