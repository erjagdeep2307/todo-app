import { Skeleton } from "../components/Skeleton";

export default function LoginSkeleton() {
  return (
    <div className="grid min-h-0 grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
      <section className="flex min-h-0 items-center justify-center">
        <div className="w-full max-w-sm">
          <Skeleton className="mb-5 h-7 w-20" />

          <div className="mb-5">
            <Skeleton className="mb-2.5 h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="mb-5">
            <Skeleton className="mb-2.5 h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="mb-3 flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Skeleton className="mt-2 h-10 w-full rounded-md" />

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </section>

      <section className="hidden min-h-0 items-end justify-center md:flex">
        <Skeleton className="aspect-square max-h-[38vh] w-full max-w-sm rounded-xl md:max-h-[90vh] md:max-w-md" />
      </section>
    </div>
  );
}
