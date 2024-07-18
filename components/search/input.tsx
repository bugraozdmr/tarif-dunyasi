import {Input} from "@nextui-org/react";
import {SearchIcon} from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchInputField = () => {
  const [filter,setFilter] = useState<string | null>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filter) {
      router.push(`${process.env.NEXT_PUBLIC_APP_URL}?filter=${filter}`);
      setFilter("");
    }
  };

  const router = useRouter();
    return ( 
        <form onSubmit={handleSubmit}>
          <Input
          value={filter as string}
          onChange={(e) => setFilter(e.target.value)}
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Ne aramak istiyorsun ?.."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        </form>
     );
}
 
export default SearchInputField;