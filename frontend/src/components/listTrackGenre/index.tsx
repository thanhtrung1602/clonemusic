import useGet from "@/hooks/useGet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ITrack } from "@/types/track";
import Image from "next/image";
import Link from "next/link";

export default function ListTrackGenre({ genreId }: { genreId: number }) {
  const { data: tracks } = useGet<ITrack[]>(
    `/tracks/findTrackByGenre/${genreId}?page=1&limit=14`
  );

  return (
    <div className="mt-8 mr-4 sm:mr-6 lg:mr-8 ">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4.5}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4.5 },
        }}
        navigation
        scrollbar={{ draggable: true }}
        className="w-full gap-4 "
      >
        {tracks?.map((track) => (
          <SwiperSlide key={track?.id}>
            <Link href={`/detail/${track?.slug}`}>
              <div className="relative overflow-hidden shadow-lg bg-white border-b border-[#f2f2f2] rounded">
                <div className="relative w-full h-[174px] pt-[100%]">
                  <Image
                    width={1000}
                    height={1000}
                    src={track?.image || "/default-image.png"}
                    alt={track?.track_name || "Default Track"}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>

                <div className="p-4 bg-white w-full">
                  <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#333]">
                    {track?.track_name}
                  </h3>
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#999]">
                    {track?.users?.username}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
