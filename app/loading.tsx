import { Skeleton, Spinner } from "@nextui-org/react";


const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-full w-full mt-3">
        <Skeleton className="w-full h-12 flex justify-center items-center mx-16 leading-relaxed">
          <Skeleton className="text-xl md:text-2xl lg:text-3xl font-serif text-center text-gray-800 leading-relaxed"></Skeleton>
        </Skeleton>
      </div>
      <div className="space-y-10 pb-10">
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
          <Skeleton className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
            <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
              <div className="font-bold text-gray-200 text-3xl sm:text-5xl lg:text-6xl sm:max-w-2xl max-w-xs"></div>
            </div>
          </Skeleton>
        </div>

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {/* RECIPE LIST */}
          <div className="space-y-4">
            <Skeleton className="font-bold text-3xl"></Skeleton>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* CARD SKELATON */}
              <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                  <Skeleton className="aspect-square object-cover rounded-md" />
                </div>
                {/* Description */}
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 mt-2 rounded-lg" />
                </div>
                <Skeleton className="flex items-center justify-between"></Skeleton>
              </div>
              <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                  <Skeleton className="aspect-square object-cover rounded-md" />
                </div>
                {/* Description */}
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 mt-2 rounded-lg" />
                </div>
                <Skeleton className="flex items-center justify-between"></Skeleton>
              </div>
              <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                  <Skeleton className="aspect-square object-cover rounded-md" />
                </div>
                {/* Description */}
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 mt-2 rounded-lg" />
                </div>
                <Skeleton className="flex items-center justify-between"></Skeleton>
              </div>
              <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                  <Skeleton className="aspect-square object-cover rounded-md" />
                </div>
                {/* Description */}
                <div>
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 mt-2 rounded-lg" />
                </div>
                <Skeleton className="flex items-center justify-between"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
