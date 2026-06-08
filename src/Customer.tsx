import { lazy, Suspense, useEffect, useState } from "react";
import type { Location } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { CampaignPassContent } from "@/components/customer/campaign-pass/CampaignPassContent";
import { CustomerPageLayout } from "@/components/customer/layout/CustomerPageLayout";
import { CustomerNav } from "@/components/customer/nav/CustomerNav";
import { CustomerHeader } from "@/components/customer/wallet/CustomerHeader";
import { StampCardsSkeleton } from "@/components/customer/wallet/StampCardsSkeleton";
import { cn } from "@/lib/utils";

const CustomerStampCards = lazy(
  () => import("@/components/customer/wallet/CustomerStampCards"),
);

export function CustomerPage() {
  return (
    <CustomerPageLayout label="Customer wallet">
      <CustomerHeader />

      <Suspense fallback={<StampCardsSkeleton />}>
        <CustomerStampCards />
      </Suspense>
    </CustomerPageLayout>
  );
}

export function CustomerCampaignPassPage() {
  return (
    <main className="min-h-svh bg-background bg-[radial-gradient(circle_at_8%_0%,rgba(216,162,74,0.18),transparent_32%),radial-gradient(circle_at_96%_8%,rgba(200,84,58,0.12),transparent_28%)] text-foreground">
      <CampaignPassContent />
      <CustomerNav />
    </main>
  );
}

export function CustomerCampaignPassModal() {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.classList.add("customer-modal-open");
    return () => {
      document.body.classList.remove("customer-modal-open");
    };
  }, []);

  function close() {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => navigate(-1), 260);
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-end p-0 md:place-items-center"
      role="dialog"
      aria-modal="true"
      aria-label="SukiPass QR code"
    >
      <button
        className={cn(
          "absolute inset-0 cursor-pointer border-0 bg-foreground/40 backdrop-blur-[10px] transition-[opacity,backdrop-filter] duration-300",
          closing && "opacity-0 backdrop-blur-0",
        )}
        aria-label="Close QR code"
        onClick={close}
      />
      <div
        className={cn(
          "relative z-[1] flex max-h-svh w-full justify-center overflow-auto px-4 pb-7 pt-[58px] transition-[opacity,transform] duration-300 md:w-[min(100%,440px)]",
          closing
            ? "translate-y-5 scale-[0.96] opacity-0"
            : "translate-y-0 scale-100 opacity-100",
        )}
      >
        <button
          className={cn(
            "absolute right-5 top-3 z-[2] grid h-[38px] w-[38px] cursor-pointer place-items-center rounded-full border border-border bg-card/90 text-foreground transition-[opacity,transform] duration-200",
            closing && "scale-[0.8] opacity-0",
          )}
          aria-label="Close QR code"
          onClick={close}
        >
          <X size={18} />
        </button>
        <CampaignPassContent />
      </div>
    </div>
  );
}

export type ModalLocationState = {
  backgroundLocation?: Location;
};
