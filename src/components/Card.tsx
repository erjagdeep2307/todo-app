import type { CardInterface } from "../features/todo/types/todo.types"
import { cn } from "../utils/utils"
export default function Card({children,className,onClick}:CardInterface) {
  return (
    <div className={cn( `flex flex-col rounded-lg px-6 py-2  border-2 border-gray-300 relative`,className)} onClick={onClick}>
        {children}
    </div>
  )
}
