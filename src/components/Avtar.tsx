import type { UserThumb } from "../features/todo/types/todo.types";
export default function UserThumb({ imgsrc }: UserThumb) {
  return (
     <img src={imgsrc} alt="" className="inline-block size-8 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
  );
}
