import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "../../config/index";
import SharedForm from "../../components/sharedComponent/form";
import ProductImageUpload from "../../components/adminFrontEnd/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, fetchAllProducts } from "@/storage/admin/products-slice";
import { toast } from "sonner";
import AdminProductTile from "@/components/adminFrontEnd/product-tile";
import {editProduct} from '../../storage/admin/products-slice/index'



const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  totalStock: ''
};

function AdminProducts() {
  const [openCreateProductSheet, setOpenCreateProductSheet] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentEditedId, setCurrentEdited] = useState(null)
  const {productList}  = useSelector(state=>state.adminProducts)
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ?
    dispatch(editProduct({
      id : currentEditedId ,formData
    })).then((data)=>{
      console.log(data, 'edit')

      if(data?.payload?.success){
       dispatch(fetchAllProducts())
       setFormData(initialFormData)
       setOpenCreateProductSheet(false)
       setCurrentEdited(null)
    }

    }) :

    
    dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl
    })).then((data)=> {
      console.log(data)
      if(data?.payload?.success)
      {
       dispatch(fetchAllProducts()) 
       setOpenCreateProductSheet(false)
       setImageFile(null);
       setFormData(initialFormData);
       toast.success("Product added successfully");


      }
    })
   
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then(data=> {
      if(data?.payload?.success){
        dispatch(fetchAllProducts());

      }
    })
  }

  function isFormValid(){
    return Object.keys(formData).map(key=> formData[key] !== '').every(item=> item );
  }

    useEffect(()=>{
      dispatch(fetchAllProducts())
    },[dispatch])

  console.log(formData,"formData");
  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProductSheet(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem=> (
          <AdminProductTile 
          setFormData={setFormData}
           setOpenCreateProductSheet={setOpenCreateProductSheet}
            setCurrentEdited= {setCurrentEdited} 
            product={productItem}
            handleDelete={handleDelete}
            />)) : null
        }
      </div>
        <Sheet open={openCreateProductSheet} onOpenChange={()=> {
          setOpenCreateProductSheet(false);
          setCurrentEdited(null);
          setFormData(initialFormData);
        }}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {
                 currentEditedId !== null ?
                 'Edit Product Details' :'Add New Product'
                }
                </SheetTitle>
            </SheetHeader>

            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null }
            />

            <div className="py-6">
              <SharedForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                controls={addProductFormElements}
                isBtnDisabled = {!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      
    </Fragment>
  );
}

export default AdminProducts;
