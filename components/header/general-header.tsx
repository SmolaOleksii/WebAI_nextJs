import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "../container/nested-container";
import { Button } from "../ui/button/template-button";
import { TBanner } from "@/types";
type TProps = {
  banner: TBanner;
  colors: {
    primary: string;
    secondary: string;
  };
};

export function Header(props: TProps) {
  const { banner, colors } = props;
  return (
    <>
      <header
        className="pointer-events-none relative flex flex-none flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]" />
        <div
          className="top-0  h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1 justify-end md:justify-center">
                <nav className="pointer-events-auto block w-full">
                  <div className="flex w-full items-center justify-between rounded-full border bg-white/90 px-10 py-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-lg dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 max-md:px-5 max-sm:flex-col max-sm:gap-5 max-sm:rounded">
                    <div
                      className="flex items-center gap-5 max-md:gap-2"
                      style={{ color: colors.primary }}
                    >
                      <Image
                        src={banner.logo.link ?? ""}
                        alt={banner.logo.alt ?? ""}
                        height={100}
                        width={100}
                      />
                      <h2 className="text-xl max-md:text-base">
                        {banner.businessName}
                      </h2>
                    </div>
                    {banner.button.list.map((data, i) => (
                      <div key={i}>
                        <Button
                          href={data.value ?? "#"}
                          text={data.label}
                          bgColor={colors.secondary}
                        />
                      </div>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <div className="flex-none" style={{ height: "var(--content-offset)" }} />
    </>
  );
}
