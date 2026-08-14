import { Skeleton } from "../components/Skelton";

export default function LoginSkelton() {
  return (
    // 1. Min-h-0 and items-center grid mirroring Login.jsx
    <div className="grid min-h-0 grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
      
      {/* Form Section */}
      <section className="flex min-h-0 items-center justify-center">
        <div className="w-full max-w-sm">
          
          {/* h1: "mb-5 text-2xl font-semibold text-heading" -> 32px height + 20px mb */}
          <Skeleton className="mb-5 h-8 w-24" />

          {/* Email Group: Label (14px + 10px mb) + Input (42px) + mb-5 */}
          <div className="mb-5">
            <Skeleton className="mb-2.5 h-3.5 w-20" /> {/* Label */}
            <Skeleton className="h-10.5 w-full rounded-md" /> {/* Input */}
          </div>

          {/* Password Group: Label (14px + 10px mb) + Input (42px) + mb-5 */}
          <div className="mb-5">
            <Skeleton className="mb-2.5 h-3.5 w-24" /> {/* Label */}
            <Skeleton className="h-10.5 w-full rounded-md" /> {/* Input */}
          </div>

          {/* FormControl Checkbox */}
          <div className="mb-5 flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>

          {/* Button: "mt-2 w-full rounded-md" -> 42px height */}
          <Skeleton className="mt-2 h-10.5 w-full rounded-md" />

          {/* Signup Link Callout: "mt-5 text-center text-sm" */}
          <div className="mt-5 flex items-center justify-center gap-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>

        </div>
      </section>

      {/* ⚡ THE BIG FIX FOR THE SVG GAP: 
          Instead of hardcoded height (e.g. 380px), use aspect ratio matching SVG vectors. 
          items-end aligns it to the bottom, matching your real <section className="items-end">!
      */}
      <section className="hidden min-h-0 items-end justify-center md:flex">
        <Skeleton className="aspect-4/3 w-full max-w-sm rounded-xl md:max-w-md" />
      </section>

    </div>
  );
}