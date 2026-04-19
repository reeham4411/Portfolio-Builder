import { Suspense } from "react";
import BuilderLayout from "@/components/builder/BuilderLayout";

export const dynamic = "force-dynamic";

export default function BuilderPage() {
  return (
    <Suspense fallback={null}>
      <BuilderLayout />
    </Suspense>
  );
}
