import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const DocumentationPage = async () => {
    return ( 
        <Container>
          <div className="mt-1.5 px-4 py-10 sm:px-6 lg:px-8">
            <Heading title="Dökümantasyon" description="Tarif Dünyası açık API endpoint(rotaları)" />
          </div>
          <div className="mt-3">
            <span className="text-bold font-semibold mx-5 text-xl">Tarifler</span>
          <ApiList
          entityName="recipes"
          entityIdName="recipeSlug"
          />
          </div>
          {/* COMMENT ICIN BOYLE OLDU */}
          <div className="mt-3 mx-4">
            <span className="text-bold font-semibold text-xl">Yorumlar</span>
            <ApiAlert
            title="GET"
            variant="public"
            description={`${process.env.NEXT_PUBLIC_APP_URL}/api/comments`}
            />
          </div>
        </Container>
     );
}
 
export default DocumentationPage;