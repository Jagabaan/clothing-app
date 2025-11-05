import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProductFilter from "@/components/userFrontEnd/filter";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/storage/shop/products-slice";
import ShoppingProductTile from "../../components/userFrontEnd/product-tile";
import { createSearchParams, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/userFrontEnd/product-details";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [filters, setFilters] = useState({});
  const [sort, setSortBy] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  function handleSort(value) {
    setSortBy(value);
  }

  function handleFilter(getSectionId, getOptionId) {
    let cpyFilters = { ...filters };
    const indexofCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexofCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getOptionId],
      };
    } else {
      const indexofCurrentOption = cpyFilters[getSectionId].indexOf(
        getOptionId
      );
      if (indexofCurrentOption === -1)
        cpyFilters[getSectionId].push(getOptionId);
      else cpyFilters[getSectionId].splice(indexofCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleFetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    setSortBy("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.entries(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 p-4 sm:p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </div>

      {/* Product Section */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-indigo-50 to-transparent rounded-t-2xl">
          <h2 className="text-xl font-semibold tracking-tight text-gray-800">
            All Products
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {productList?.length ?? 0} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
                >
                  <ArrowUpDown className="h-4 w-4 opacity-70" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] rounded-xl shadow-lg border border-gray-200 bg-white/95 backdrop-blur-md"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <div
                key={productItem._id}
                className="transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <ShoppingProductTile
                  handleFetProductDetails={handleFetProductDetails}
                  product={productItem}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10 text-sm">
              No products found.
            </p>
          )}
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
