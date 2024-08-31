"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { DatePicker, Drawer, InputNumber, Radio, Switch } from "antd";
import moment from "moment";

import { Close, Filter } from "@/components/icons/Icons";
import { categories, sortProducts } from "@/constants";
import CustomBtn from "@/components/shared/CustomBtn";

export default function FilterProducts() {
  const search = new URLSearchParams(window.location.search);

  const [open, setOpen] = useState(false);
  const [filterForm, setFilterForm] = useState({
    category: search.get("category") || "",
    stock: search.get("stock") || false,
    sort: search.get("sort") || 0,
    minPrice: Number(search.get("minPrice")) || 0,
    maxPrice: Number(search.get("maxPrice")) || 0,
    discount: Number(search.get("discount")) || 0,
    minDate: search.get("minDate") ? moment(search.get("minDate")) : null,
    maxDate: search.get("maxDate") ? moment(search.get("maxDate")) : null,
  });

  const router = useRouter();

  const showDrawer = () => setOpen(true);

  const closeDrawer = () => setOpen(false);

  const submitFilter = () => {
    if (search.has("page")) search.delete("page");

    for (const key in filterForm) {
      if (filterForm[key]) {
        search.set(key, filterForm[key]);
        const newPathName = `${window.location.pathname}?${search.toString()}`;
        router.push(newPathName);
        closeDrawer();
      } else {
        if (search.has(key)) {
          search.delete(key);
          const newPathName = `${
            window.location.pathname
          }?${search.toString()}`;
          router.push(newPathName);
          closeDrawer();
        } else {
          closeDrawer();
        }
      }
    }
  };

  const clearFilter = () => {
    setFilterForm({
      category: "",
      stock: false,
      sort: 0,
      minPrice: 0,
      maxPrice: 0,
      discount: 0,
      minDate: null,
      maxDate: null,
    });

    router.push("/products");
    closeDrawer();
  };

  return (
    <section>
      <button
        type="button"
        onClick={() => showDrawer()}
        className="bg-gray-100 rounded-xl p-4 flex items-center gap-2 hover:bg-gray-200 transition1"
      >
        <div className="iconSize">
          <Filter />
        </div>
        <p className="max-md:hidden">Filter</p>
      </button>
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <h1>Filter Products</h1>
            <button type="button" onClick={() => closeDrawer()}>
              <Close />
            </button>
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={open}
        closeIcon={false}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1>Only available items</h1>
            <Switch
              value={filterForm.stock}
              onChange={(checked) => {
                setFilterForm({ ...filterForm, stock: checked });
              }}
            />
          </div>
          <FilterWrapper title="Sort By:">
            <div className="flex flex-wrap gap-3">
              {sortProducts.map((el) => (
                <button
                  key={el.sortId}
                  type="button"
                  className={`${
                    search.has("sort") &&
                    search.get("sort") == el.sortId &&
                    "bg-gray-700 hover:bg-gray-800 text-white"
                  } ${
                    filterForm.sort == el.sortId && "bg-gray-200"
                  } capitalize rounded-xl py-1 px-3 hover:bg-gray-200 transition1`}
                  onClick={() =>
                    setFilterForm({ ...filterForm, sort: el.sortId })
                  }
                >
                  {el.sortName}
                </button>
              ))}
            </div>
          </FilterWrapper>
          <FilterWrapper title="Category">
            <div className="flex flex-wrap gap-3">
              {categories.map((el) => (
                <button
                  key={el.title}
                  type="button"
                  className={`${
                    search.has("category") &&
                    search.get("category").toLowerCase() ==
                      el.title.toLowerCase() &&
                    "bg-gray-700 hover:bg-gray-800 text-white"
                  } ${
                    filterForm.category.toLowerCase() ==
                      el.title.toLowerCase() && "bg-gray-200"
                  } capitalize rounded-xl py-1 px-3 hover:bg-gray-200 transition1`}
                  onClick={() =>
                    setFilterForm({
                      ...filterForm,
                      category: el.title.toLowerCase(),
                    })
                  }
                >
                  {el.title}
                </button>
              ))}
            </div>
          </FilterWrapper>
          <FilterWrapper>
            <Radio.Group
              value={filterForm.discount}
              onChange={(e) =>
                setFilterForm({ ...filterForm, discount: e.target.value })
              }
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Radio value={"has-discount"}>Discount items only</Radio>
              <Radio value={"no-discount"}>Non-Discount items only</Radio>
            </Radio.Group>
          </FilterWrapper>
          <FilterWrapper title="Price Range">
            <div className="flex items-center gap-3">
              <InputNumber
                min={0}
                placeholder="Min Price"
                value={filterForm.minPrice}
                onChange={(value) =>
                  setFilterForm({ ...filterForm, minPrice: value })
                }
              />
              <InputNumber
                min={0}
                placeholder="Max Price"
                value={filterForm.maxPrice}
                onChange={(value) =>
                  setFilterForm({ ...filterForm, maxPrice: value })
                }
              />
            </div>
          </FilterWrapper>
          <FilterWrapper title="Date Range">
            <div className="flex items-center gap-3">
              <DatePicker
                placeholder="Start Date"
                value={filterForm.minDate}
                onChange={(date) =>
                  setFilterForm({ ...filterForm, minDate: date })
                }
                disabledDate={(current) => current && current < startDate}
              />
              <DatePicker
                placeholder="End Date"
                value={filterForm.maxDate}
                onChange={(date) =>
                  setFilterForm({ ...filterForm, maxDate: date })
                }
                disabledDate={(current) =>
                  current && current < filterForm.minDate
                }
              />
            </div>
          </FilterWrapper>
          <CustomBtn
            title="Submit Filter"
            type="button"
            onClick={() => submitFilter()}
            classNames="bg-black text-white w-full py-2 rounded-lg font-medium"
          />
          <CustomBtn
            title="Clear Filter"
            type="button"
            onClick={() => clearFilter()}
            classNames="bg-black text-white border w-full py-2 rounded-lg font-medium"
          />
        </div>
      </Drawer>
    </section>
  );
}

const FilterWrapper = ({ children, title, className }) => {
  return (
    <div className={`cardShadow rounded-2xl px-4 py-2 ${className || ""}`}>
      <h1 className="subheader mb-3">{title}</h1>
      {children}
    </div>
  );
};
