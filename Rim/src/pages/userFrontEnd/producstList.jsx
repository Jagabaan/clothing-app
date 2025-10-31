import ProductFilter from "@/components/userFrontEnd/filter"

function ShoppingListing() {
    return <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] p-6 " >
        <ProductFilter/>
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between ">
            <h2 className="text-lg font-semibold" >All products</h2>
          </div>
        </div>
    </div>
}

export default ShoppingListing;