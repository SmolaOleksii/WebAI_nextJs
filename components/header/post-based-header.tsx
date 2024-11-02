"use client";

import Link from "next/link";

import { Button } from "../ui/button/template-button";
import Image from "next/image";
import { Container } from "@/components/container";
import { TBanner, TColors } from "@/types";

type TProps = {
  banner: TBanner;
  colors: TColors;
};

export function Header(props: TProps) {
  const { banner, colors } = props;
  return (
    <header className="py-10">
      <Container>
        <nav className="z-1 relative flex items-center justify-between gap-10 max-sm:flex-col">
          <div
            className="flex items-center md:gap-x-12 "
            style={{ color: colors.primary }}
          >
            <Link
              href="#"
              aria-label="Home"
              className="flex items-center gap-5"
            >
              <Image
                src={banner.logo.link ?? ""}
                alt={banner.logo.alt ?? ""}
                height={100}
                width={100}
              />
              {banner.businessName}
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {banner.button.list.map((data, i) => (
              <div key={i}>
                <Button
                  href={data.value ?? "#"}
                  text={data.label}
                  bgColor={colors.secondary}
                />
              </div>
            ))}
            <div className="-mr-1 md:hidden">{/* <MobileNavigation /> */}</div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
