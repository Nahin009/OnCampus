import React from 'react'
type ProductInfo = {
    type:string;
    name:string;
    price:number;
    contact:string
  }
const ProductInfo = ({product}:{product:ProductInfo}) => {
  return (
    <div className="bg-white border border-slate-500 shadow-md p-4 m-4 rounded-md">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Type</span>
          <span className="text-lg">{product.type}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Name</span>
          <span className="text-lg">{product.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Price</span>
          <span className="text-lg">{product.price}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Contact</span>
          <span className="text-lg">{product.contact}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo