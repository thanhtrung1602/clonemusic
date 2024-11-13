import Image from "next/image";
interface IResultSearch {
  id: number;
  name: string;
  image: string;
}
function ResultSearch(props: IResultSearch) {
  return (
    <div>
      <div className="mx-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="w-6"
            width={24}
            height={24}
            src={
              props.image ||
              "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
            }
            alt={props.name}
            priority
          />
          <p>{props.name}</p>
        </div>
        <div>{}</div>
      </div>
    </div>
  );
}

export default ResultSearch;
