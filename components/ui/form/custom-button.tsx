import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

type TProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowButtonForm: React.Dispatch<
    React.SetStateAction<{
      edit: string;
      show: boolean;
    }>
  >;
  setBrandCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  setHeroCustomizeFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  section: TSection;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  showButtonForm: {
    edit: string;
    show: boolean;
  };
  handleChange: DebouncedState<(name: string, value: string) => void>;
};
import { IoMdArrowBack } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { FormField, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { randomUUID } from "crypto";
import { generateUniqueId } from "@/lib/utils/function";

const linkTypes = ["External", "Section"];

const CustomButton = (props: TProps) => {
  const {
    setIsOpen,
    setShowButtonForm,
    setBrandCustomizeFields,
    setHeroCustomizeFields,
    brandCustomizeFields,
    heroCustomizeFields,
    section,
    showButtonForm,
    handleChange,
  } = props;
  const [loading, setLoading] = useState(false);
  const appState = useAppSelector(AS);

  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (showButtonForm.edit) {
      switch (section) {
        case "Banner":
          brandCustomizeFields.forEach((field) => {
            field.children?.forEach((child) => {
              if (child.name === showButtonForm.edit) {
                setData(child);
              }
            });
          });
          break;
        case "Hero":
          heroCustomizeFields.forEach((field) => {
            field.children?.forEach((child) => {
              if (child.name === showButtonForm.edit) {
                setData(child);
              }
            });
          });
          break;
      }
    }
  }, [showButtonForm]);

  function handleButtonSubmit(name: string) {
    if (showButtonForm.edit) {
      switch (section) {
        case "Banner":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                banner: {
                  ...appState.aiContent.banner,
                  button: {
                    ...appState.aiContent.banner.button,
                    list: appState.aiContent.banner.button.list.map((item) => {
                      if (item.name === name) {
                        return {
                          name: name,
                          label: data.label,
                          type: data.type,
                          link: data.link,
                        };
                      } else {
                        return item;
                      }
                    }),
                  },
                },
              },
            }),
          );

          const tempBrand = brandCustomizeFields;
          tempBrand.forEach((field) => {
            if (field.type === "button") {
              field.children?.forEach((child) => {
                if (child.name === name) {
                  child.label = data.label;
                  child.type = data.type;
                  child.link = data.link;
                }
              });
            }
          });
          setBrandCustomizeFields(tempBrand);
          break;
        case "Hero":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                hero: {
                  ...appState.aiContent.hero,
                  button: {
                    ...appState.aiContent.hero.button,
                    list: appState.aiContent.hero.button.list.map((item) => {
                      if (item.name === name) {
                        return {
                          name: name,
                          label: data.label,
                          type: data.type,
                          link: data.link,
                        };
                      } else {
                        return item;
                      }
                    }),
                  },
                },
              },
            }),
          );

          const tempHero = heroCustomizeFields;
          tempHero.forEach((field) => {
            if (field.type === "button") {
              field.children?.forEach((child) => {
                if (child.name === name) {
                  child.label = data.label;
                  child.type = data.type;
                  child.link = data.link;
                }
              });
            }
          });
          setHeroCustomizeFields(tempHero);
          break;
      }
    } else {
      const id = generateUniqueId();
      switch (section) {
        case "Banner":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                banner: {
                  ...appState.aiContent.banner,
                  button: {
                    ...appState.aiContent.banner.button,
                    list: [
                      ...appState.aiContent.banner.button.list,
                      {
                        name: id,
                        label: data.label,
                        type: "External",
                        link: data.link,
                      },
                    ],
                  },
                },
              },
            }),
          );

          const tempBrand = brandCustomizeFields;
          tempBrand.forEach((field) => {
            if (field.type === "button") {
              field.children?.push({
                name: id,
                type: "External",
                label: data.label,
                defaultValue: "",
                placeholder: "Enter",
                link: data.link,
                validation: {
                  required: true,
                },
              });
            }
          });
          setHeroCustomizeFields(tempBrand);
          break;
        case "Hero":
          dispatch(
            updateAppState({
              ...appState,
              aiContent: {
                ...appState.aiContent,
                hero: {
                  ...appState.aiContent.hero,
                  button: {
                    ...appState.aiContent.hero.button,
                    list: [
                      ...appState.aiContent.hero.button.list,
                      {
                        name: id,
                        label: data.label,
                        type: "External",
                        link: data.link,
                      },
                    ],
                  },
                },
              },
            }),
          );

          const tempData = heroCustomizeFields;
          tempData.forEach((field) => {
            if (field.type === "button") {
              field.children?.push({
                name: id,
                type: "External",
                label: data.label,
                defaultValue: "",
                placeholder: "Enter",
                link: data.link,
                validation: {
                  required: true,
                },
              });
            }
          });
          setHeroCustomizeFields(tempData);
          break;
      }
    }

    setShowButtonForm({
      edit: "",
      show: false,
    });
  }

  return (
    <div className="">
      <div className=" border-b px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h2
            className="flex items-center gap-2 text-base font-semibold leading-6 "
            id="slide-over-title"
          >
            <IoMdArrowBack
              onClick={() =>
                setShowButtonForm({
                  edit: "",
                  show: false,
                })
              }
              className="cursor-pointer"
            />
            Button Settings
          </h2>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative rounded-md  text-black  focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="absolute -inset-2.5"></span>
              <span className="sr-only">Close panel</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-5 p-5">
        <div className="flex flex-col ">
          <label
            htmlFor="linktype"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Link type
          </label>
          <Select
            // defaultValue={data?.type ?? ""}
            defaultValue={data?.type ?? "External"}
            onValueChange={(value) => {
              setData({ ...data, type: value });
              if (showButtonForm.edit) {
                handleChange(data?.name, {
                  ...{ ...data, type: value },
                  fieldType: "button",
                  section,
                });
              }
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select a Link Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {linkTypes.map((type) => (
                  <SelectItem value={type} key={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="label"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Label
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"label"}
            defaultValue={data?.label ?? ""}
            onChange={(e) => {
              setData({ ...data, label: e.target.value });
              if (showButtonForm.edit) {
                handleChange(data.name, {
                  ...{ ...data, label: e.target.value },
                  fieldType: "button",
                  section,
                });
              }
            }}
          />
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="website"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Website
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"website"}
            defaultValue={data?.link ?? ""}
            onChange={(e) => {
              setData({ ...data, link: e.target.value });
              if (showButtonForm.edit) {
                handleChange(data.name, {
                  ...{ ...data, link: e.target.value },
                  fieldType: "button",
                  section,
                });
              }
            }}
          />
        </div>
        <button
          onClick={() => handleButtonSubmit(data.name)}
          type="button"
          className={`ml-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
          disabled={loading}
        >
          {loading && (
            <ImSpinner2 className="animate-spin text-lg text-white" />
          )}
          Save
        </button>
      </form>
    </div>
  );
};

export default CustomButton;
