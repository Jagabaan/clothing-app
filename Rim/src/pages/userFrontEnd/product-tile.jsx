import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({product}) {
    return (
       <Card className="w-full max-w-sm mx-auto" >
            <div>
                <div className="relative" >
                    <img 
                    src={product?.image} 
                    alt={product?.title} 
                    className="w-full h-[300px] object-cover rounded-t-lg" />
                </div>
                <CardContent className="p-4" >
                    <h2 className="text-xl font-bold mb-2" >{product?.title}</h2>
                    <div className="flex items-center justify-between mb-2" >
                        <span className="text-[15px] text-muted-foreground" >{categoryOptionsMap[product?.category]}</span>
                        <span className="text-[15px] text-muted-foreground" >{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2" >
                        <span className="text-lg font-semibold text-primary" > ₦{product?.price}</span>
                        
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" >Add to cart </Button>
                </CardFooter>
            </div>
       </Card>
    );
}

export default ShoppingProductTile;