import type { ImageInfo } from "../features/todo/types/todo.types"

function AuthImage({image}:{image:ImageInfo}) {
  return (
    <div>
        <img src={image.src} alt={image.alttext} />
    </div>
  )
}
export default AuthImage