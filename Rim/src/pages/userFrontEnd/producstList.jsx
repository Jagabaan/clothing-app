import { DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioGroup,
  DropdownMenuRadioItem, 
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ProductFilter from "@/components/userFrontEnd/filter"
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch } from "react-redux";
import { use, useEffect } from "react";
import { fetchAllFilteredProducts } from "@/storage/shop/products-slice";
import { useSelector } from "react-redux";
import ShoppingProductTile from "./product-tile";
import { useState } from "react";


function ShoppingListing() {


    const dispatch = useDispatch()
    const {productList} = useSelector(state=> state.shopProducts) 
    const [filters, setFilters] = useState({});
    const [sort, setSortBy] = useState(null);

    function handleSort(value) {
  setSortBy(value);
}

function handleFilter(getSectionId, getOptionId) {
  console.log(getSectionId, getOptionId, 'filter values');

  let cpyFilters = { ...filters };
  const indexofCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

  if (indexofCurrentSection === -1) {
    cpyFilters = {
      ...cpyFilters,
      [getSectionId]: [getOptionId],
    };
  } else {
    const indexofCurrentOption = cpyFilters[getSectionId].indexOf(getOptionId);
  }
}


    useEffect(() => {
      dispatch(fetchAllFilteredProducts())
    },[dispatch])

    console.log("Products in listing:", productList);

    return <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] p-6 " >
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between ">
            <h2 className="text-lg font-semibold" >All products</h2>
            <div className="flex items-center gap-3" >
              <span className="text-muted-foreground  " >{productList?.length} products</span>
               <DropdownMenu>
              <DropdownMenuTrigger asChild >
                <Button variant="outline" size="sm" className="flex items-center gap-1" >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sor By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]" > 
                <DropdownMenuRadioGroup value= {sort} onValueChange={handleSort} >
                 {
                  sortOptions.map(sortItem=> <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} >
                    {sortItem.label}
                  </DropdownMenuRadioItem>)
                }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 " >
                  {
                    productList && productList.length > 0 ?
                    productList.map(productItem=> <ShoppingProductTile product={productItem} /> ) : null
                  }
          </div>
        </div>
    </div>
}

export default ShoppingListing;