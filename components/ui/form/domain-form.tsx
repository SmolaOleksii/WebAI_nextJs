"use client";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Search from "@/components/ui/search";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchSitesByUser,
  loading as LD,
  sitesData as SD,
} from "@/lib/store/slices/site-slice";
import { useEffect, useState } from "react";
import Loader from "../loader";
import { useMediaQuery } from "usehooks-ts";
import { DomainDrawer } from "../drawer/domain-drawer";
import DomainModal from "../modal/domain-modal";
export default function DomainForm() {
  const [isUpdateSubdomain, setIsUpdateSubdomain] = useState(false);
  const [selectedSubdomain, setSelectedSubdomain] = useState("");

  const isMobile = useMediaQuery("(max-width: 1024px)");
  const sites = useAppSelector(SD);
  const isLoading = useAppSelector(LD);
  const dispatch = useAppDispatch();
  const getData = async () => {
    try {
      const siteData = await dispatch(fetchSitesByUser()).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {isMobile ? (
        <DomainDrawer
          open={isUpdateSubdomain}
          setOpen={setIsUpdateSubdomain}
          subdomain={selectedSubdomain}
        />
      ) : (
        <DomainModal
          open={isUpdateSubdomain}
          setOpen={setIsUpdateSubdomain}
          subdomain={selectedSubdomain}
        />
      )}
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Current Domains
        </h2>
        {isLoading ? (
          <div className="flex h-96 items-center justify-center ">
            <Loader text="Fetching Domains" />
          </div>
        ) : (
          <>
            {sites?.map((site) => (
              <div
                className="flex items-center justify-between  pt-6 sm:flex"
                key={site.id}
              >
                <div className=" inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500  sm:flex-none">
                  <Link
                    href={`https://${site.subdomain}.webeasy.ai`}
                    target="_blank"
                    className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                  >
                    {site.subdomain}.webeasy.ai
                    <FaExternalLinkAlt
                      className="-ml-0.5 mr-1.5 h-4 w-4 text-indigo-600"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setIsUpdateSubdomain(true);
                    setSelectedSubdomain(site.subdomain);
                  }}
                >
                  Update
                </button>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Custom Domain
        </h2>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search for a domain name..." />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Existing Domain
        </h2>

        <div className="flex flex-wrap items-center  justify-between pt-6 sm:flex">
          <div className=" inline-flex items-center font-medium   sm:flex-none ">
            Link your existing domain name with Entri. It’s fast and secure.
            <Link
              href="/settings"
              className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Learn more
            </Link>
          </div>
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Link domain
          </button>
        </div>
      </div>
    </>
  );
}
