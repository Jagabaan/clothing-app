import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductSheet,
  setCurrentEdited,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-muted/20 bg-white">
      <div className="relative group">

        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[280px] object-cover"
        />

        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {product?.title}
        </h2>

        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
            ₦{product?.price}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 p-4">
        <Button
          className="flex-1 flex items-center gap-2"
          onClick={() => {
            setOpenCreateProductSheet(true);
            setCurrentEdited(product?._id);
            setFormData(product);
          }}
        >
          <Pencil className="h-4 w-4" /> Edit
        </Button>

        <Button
          variant="destructive"
          className="flex-1 flex items-center gap-2"
          onClick={() => handleDelete(product?._id)}
        >
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
