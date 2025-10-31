

export const registrationForm = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter Your Username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your password",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Your password",
    componentType: "input",
    type: "password",
  },
];


export const LoginnForm = [
 {
    name : "email",
    label : "Email",
    placeholder : "Enter Your Email",
    componentType : "input",
    type : "email"
},
{
    name : "password",
    label : "password",
    placeholder : "Enter Your password",
    componentType : "input",
    type : "password"
}
]

 export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Zara" },
      { id: "adidas", label: "TZZ" },
      { id: "puma", label: "Puma" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const userViewHeaderMenuItems = [
{
  id : 'home',
  label : 'Home',
  path : '/shop/home'
},
{
  id : 'men',
  label : 'men',
  path : '/shop/products'
},
{
  id : 'women',
  label : 'women',
  path : '/shop/products'
},
{
  id : 'kids',
  label : 'Kids',
  path : '/shop/products'
},
{
  id : 'footwear',
  label : 'Footwear',
  path : '/shop/products'
},
{
  id : 'accessorie',
  label : 'Accessories',
  path : '/shop/products'
}
]

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};