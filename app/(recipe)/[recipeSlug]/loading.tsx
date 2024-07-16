import { Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* GALLERY */}
              <Skeleton className="flex flex-col-reverse" style={{height:"40%"}}>
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <div className="grid grid-cols-4 gap-6">
                    {/* GALLERY TAB */}
                    <Skeleton className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
                      <div>
                        <Skeleton className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
                          <Skeleton className="object-cover object-center" />
                        </Skeleton>
                      </div>
                    </Skeleton>
                  </div>
                </div>
                <div className="aspect-square w-full">
                  <div key={1}>
                    <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                      <Skeleton className="object-cover object-center" />
                    </div>
                  </div>
                  <div key={2}>
                    <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                      <Skeleton className="object-cover object-center" />
                    </div>
                  </div>
                </div>
              </Skeleton>
              {/* GALLERY */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                {/* INFO */}
                <div>
                  <Skeleton className="h-3 w-2/5 rounded-lg" />

                  <div className="mt-3 flex items-end justify-between">
                    <Skeleton className="h-3 w-2/5 mt-2 rounded-lg" />
                  </div>
                  <hr className="my-4" />
                  <div className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-x-4">
                      <Skeleton className="h-3 w-2/5 rounded-lg" />
                      <Skeleton className="h-3 w-3/5 mt-3 rounded-lg" />
                    </div>
                    <div className="flex items-center gap-x-4">
                      <Skeleton className="flex rounded-full w-12 h-12" />

                      <Skeleton className="h-3 w-3/5 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-x-4">
                      <Skeleton className="h-3 w-2/5 rounded-lg" />

                      <Skeleton className="h-3 w-4/5 mt-3 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 mt-1 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 mt-1 rounded-lg" />
                    </div>
                  </div>

                  <hr className="mt-6" />
                  <div className="flex flex-col gap-x-4 mt-5">
                    <Skeleton className="h-3 w-2/5 rounded-lg" />

                    <Skeleton className="w-full" />

                    {/* COMMENT SECTION */}
                    <div className="mt-2">
                      {/* Comment CARD */}
                      <Skeleton className="w-full">
                        <Skeleton className="justify-between">
                          <div className="flex gap-5">

                            <div className="flex flex-col gap-1 items-start justify-center">
                              <Skeleton className="h-3 w-3/5 rounded-lg" />
                              <Skeleton className="h-3 w-4/5  mt-2 rounded-lg" />
                            </div>
                          </div>
                        </Skeleton>
                        <Skeleton className="justify-between">
                          <div className="flex gap-5">

                            <div className="flex flex-col gap-1 items-start justify-center">
                              <Skeleton className="h-3 w-3/5 rounded-lg" />
                              <Skeleton className="h-3 w-4/5  mt-2 rounded-lg" />
                            </div>
                          </div>
                        </Skeleton>
                        <div className="px-3 py-0 text-small text-default-400">
                          <Skeleton className="h-3 w-3/5 rounded-lg" />
                        </div>
                      </Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-4" />
      </div>
    </>
  );
};

export default Loading;
