"use client";
import { useState, memo } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "@/components/Popper";
import useSearch from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import ResultSearch from "./resultSearch";
type TrackSearch = {
  _id: number;
  _source: {
    track_name: string;
    image: string;
  };
};
function Search() {
  const [key, setKey] = useState("");
  const [hiddenSearch, setHiddenSearch] = useState(false);
  // const inputSearchDebounce = useDebounce(key, 500);
  // const { data: tracks, isLoading } = useSearch<TrackSearch[]>(
  //   "/tracks/search",
  //   inputSearchDebounce
  // );
  // console.log(tracks);
  return (
    <>
      <HeadlessTippy
        interactive
        visible={hiddenSearch}
        render={(attrs) => (
          <div className="mt-[-1px] w-[385px]" tabIndex={-1} {...attrs}>
            {/* <PopperWrapper>
              {hiddenSearch && (
                <ul className="bg bg-slate-950 text-[#ccc]">
                  <li className="bg-[#333] p-[6px]">Search for `{key}`</li>
                  {isLoading && (
                    <li className="bg-[#333] p-[6px]">Loading...</li>
                  )}
                  {tracks?.map((track) => (
                    <li
                      className="cursor-pointer p-[6px] hover:bg-[#333]"
                      key={track._id}
                    >
                      <Link href="">
                        {
                          <ResultSearch
                            id={track._id}
                            image={track._source.image}
                            name={track._source.track_name}
                          />
                        }
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </PopperWrapper> */}
          </div>
        )}
        onClickOutside={() => setHiddenSearch(false)}
      >
        <form>
          <div className="w-full rounded bg-[#e5e5e5] transition delay-300 ease-in-out focus-within:bg-[#fff]">
            <input
              type="text"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setHiddenSearch(true);
              }}
              className="h-7 w-[355px] rounded bg-[#e5e5e5] p-2 text-[#666] outline-none transition delay-300 ease-in-out focus:bg-[#fff]"
              placeholder="Search for artists, tracks"
              name=""
              id=""
              onFocus={() =>
                key.length > 0 ? setHiddenSearch(true) : setHiddenSearch(false)
              }
            />
            <button type="submit" className="px-2 text-[#111]">
              {/* <FontAwesomeIcon icon={props.search} /> */}
            </button>
          </div>
        </form>
      </HeadlessTippy>
    </>
  );
}

export default memo(Search);
