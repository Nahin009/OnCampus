import React from "react";
import {
  Button,
  IconButton,
  Card,
  Input,
  Checkbox,
  Typography,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";

type ProductInfo = {
    type:string;
    name:string;
    price:number;
    contact:string
}
import { ContextProvider } from "./SinglePost"
import { useContext } from "react";
const ProductPost = ({productInfo}:{productInfo:ProductInfo}) => {
    const {moreData, changeMoreData} = useContext(ContextProvider);
    const [type, setType] = React.useState(productInfo.type);
    const [name, setName] = React.useState(productInfo.name);
    const [price, setPrice] = React.useState<number | undefined>(productInfo.price);
    const [contact, setContact] = React.useState(productInfo.contact);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        if (inputValue <= 0) {
            setPrice(undefined);
            return;
        }

        if (!isNaN(inputValue)) {
            setPrice(inputValue);
            changeMoreData({...moreData, price: inputValue})
        } else {
            setPrice(undefined);
        }
    }

  return (
    <div className="mb-1 flex flex-col gap-6">
      <Typography variant="h4" color="blue-gray">
        Product post
      </Typography>
      <Select
            variant="static"
            label="Select Medium:"
            value={type}
            onChange={(e) => {
            setType(e ?? "");
            changeMoreData({ ...moreData, type: e ?? "" });
            }}
        >
            <Option value="Normal">Normal</Option>
            <Option value="Second hand">Second hand</Option>
        </Select>
        
        <Typography variant="small" color="blue-gray">
            Name:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write hospital name"
            value={name}
            onChange={(e) => {
                setName(e.target.value)
                changeMoreData({...moreData, name: e.target.value})
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />
        
        <Typography variant="small" color="blue-gray">
            Price:
        </Typography>
        <Input
            required
            type="number"
            size="lg"
            value={price !== undefined ? price : ""}
            placeholder="Write price"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
            onChange={handlePriceChange}
        />

        <Typography variant="small" color="blue-gray">
            Contact:
        </Typography>
        <Input
            required
            type="text"
            placeholder="Write contact number"
            value={contact}
            onChange={(e) => {
                setContact(e.target.value)
                changeMoreData({...moreData, contact: e.target.value})
            }}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
            className: "before:content-none after:content-none",
            }}
        />
        
    </div>
  );
};

export default ProductPost;
