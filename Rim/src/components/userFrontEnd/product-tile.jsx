import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({ product, handleFetProductDetails }) {
  return (
    <Card
      className="w-full max-w-xs sm:max-w-none mx-auto rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-transform duration-300 bg-white"
    >
      <div onClick={() => handleFetProductDetails(product?._id)} className="cursor-pointer">
        {/* Product Image */}
        <div className="relative flex items-center justify-center bg-gray-50">
          <img
            src={product?.image}
            alt={product?.title}
            loading="lazy"
            className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-contain p-3 transform-gpu transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-1 line-clamp-1">
            {product?.title}
          </h2>

          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-500">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-gray-500">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              ₦{product?.price}
            </span>
          </div>
        </CardContent>

        {/* Add to Cart Button */}
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-neutral-900 hover:bg-black text-white font-medium rounded-lg"
          >
            Add to cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
