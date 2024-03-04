import Avatar from "./Avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="mx-6 my-6">
      <div className="flex gap-2 items-center ">
        <Avatar name="nikhil" size="small" />{" "}
        <div className="pl-2 ">{authorName}</div>
        <div className="pl-2 font-thin">{publishedDate}</div>
      </div>
      <div className="mt-1 font-bold text-2xl">{title}</div>
      <div className="mt-3">{content.slice(0, 100) + "..."}</div>
      <div className="text-sm font-thin">{`${Math.ceil(
        content.length / 100
      )} mintues read`}</div>
      <div className="bg-slate-400 h-[1px] w-full mt-6"></div>
    </div>
  );
};
