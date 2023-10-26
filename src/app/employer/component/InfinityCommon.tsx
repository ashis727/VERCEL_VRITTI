
"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface ICommonInfinityProps {
  data: any;
  view: any;
}
export default function InfinityCommon({ data, view }: ICommonInfinityProps) {
 

  const [newData, setNewData] = useState<any>(data);
  const [oldData, setOldData] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setNewData(data ? data : oldData);
  }, [data]);
  const handleNext = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(newData?.next);
      // console.log(data);
      setNewData({
        next: data.next,
        previous: data.previous,
        count: data.count,
        results: [...newData.results, ...data.results],
      });
      setNewData({
        next: data.next,
        previous: data.previous,
        count: data.count,
        results: [...newData.results, ...data.results],
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleRefresh = async () => {};
  return (
    <div className={`pb-20`}>
      <InfiniteScroll
        dataLength={newData?.results?.length} //This is important field to render the next data
        next={handleNext}
        hasMore={newData?.results?.length != newData.count}
        loader={
          <p className={`${
           "rightToLeftLanguage flex-row-reverse"
          }  text-center font-cinzel text-xl cursor-pointer`}>
          loading...
          </p>
        }
        endMessage={
          <p>
            you have seen all !
          </p>
        }
        //   below props only if you need pull down functionality
        refreshFunction={handleRefresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 className={`
    
        mt-5 font-space text-lg text-white text-center`}>
            
          </h3>
        }
        releaseToRefreshContent={
          <h3 className={`    
          mt-5 font-space text-lg text-white text-center`}>
           
          </h3>
        }
      >
        <div className="w-full flex flex-wrap p-5">
          {newData?.results?.map((item: any, index: number) =>
            view(item, index)
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}