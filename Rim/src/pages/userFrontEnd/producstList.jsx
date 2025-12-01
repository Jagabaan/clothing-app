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
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/storage/shop/products-slice";
import ShoppingProductTile from "../../components/userFrontEnd/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "../../components/userFrontEnd/product-details";
import { addToCart, fetchCartItems } from "@/storage/shop/cart-slice";
import { toast } from "sonner";



// --- Helper ---
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
  const { user } = useSelector(state => state.auth); 
  const [filters, setFilters] = useState({});
  const [sort, setSortBy] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


  // --- Handlers ---
  const handleSort = useCallback((value) => {
    setSortBy(value);
  }, []);

  const handleFilter = useCallback((getSectionId, getOptionId) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const sectionExists = updatedFilters[getSectionId];

      if (!sectionExists) {
        updatedFilters[getSectionId] = [getOptionId];
      } else {
        const optionIndex = updatedFilters[getSectionId].indexOf(getOptionId);
        if (optionIndex === -1) {
          updatedFilters[getSectionId].push(getOptionId);
        } else {
          updatedFilters[getSectionId].splice(optionIndex, 1);
        }
      }

      sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
      return { ...updatedFilters };
    });
  }, []);

  const handleFetProductDetails = useCallback(
    (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId));
    },
    [dispatch]
  );

function handleAddToCart(getCurrentProductId) {
  dispatch(
    addToCart({
      userId: user?.id,
      productId: getCurrentProductId,
      quantity: 1,
    })
  ).then((data) => {
    if (data?.payload?.success) {
      dispatch(fetchCartItems(user?.id));
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Failed to add product. Please try again.");
    }
  });
}


  // --- Effects ---
  useEffect(() => {
    setSortBy("price-lowtohigh");
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(storedFilters);
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (filters && sort) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);


  // --- Memoized Product Tiles ---
  const productTiles = useMemo(() => {
    if (!productList || productList.length === 0)
      return (
        <p className="col-span-full text-center text-gray-500 py-10 text-sm">
          No products found.
        </p>
      );

    return productList.map((productItem) => (
      <div
        key={productItem._id}
        className="transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <ShoppingProductTile
          handleFetProductDetails={handleFetProductDetails}
          product={productItem}
          handleAddToCart={handleAddToCart}
        />
      </div>
    ));
  }, [productList, handleFetProductDetails]);

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
                      key={sortItem.id}
                      value={sortItem.id}
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
          {productTiles}
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
