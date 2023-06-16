import React, {useCallback, useMemo, useState} from 'react'
import { RowProps } from '@/interface/Row'

import Image from "next/image";
import noImg from '../public/images/no-image.svg'
import clsx from "clsx"
import StarRating from "./StarRating";
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

const RowComponent:React.FC<RowProps> = ({ index, style, products }) => {
    const [num, setNum] = useState(0)
    const imgLenght = products?.products[index].images.length

    const imgNum = useMemo(() => {
        return num
    },[num])
    
    const handleClick = useCallback((s:string)=>{
        if(imgLenght > 1){
        if(s === 'l'){
            if(num <= 0){
            setNum(imgLenght - 1)
                }else{
                setNum(prev=> prev - 1)
                }
            }
        else if(s === 'r'){
            if(num >= (imgLenght - 1)){
                setNum(0)
            }else{
                setNum(prev=> prev + 1)
            }
        }
    }
    },[num])
    
  return (
    <div>
        <div className={clsx("cursor-pointer flex flex-col justify-center items-center", index%2 ? 'bg-gray-200' : 'bg-gray-50')} style={style}>
      <div className="relative group">
        <Image src={products?.products[index].images[imgNum] || noImg} alt='product image' priority={true} width={50} height={50} style={{objectFit:"contain", borderRadius:"50%"}} className='rounded-full max-w-[100px] max-h-[60px]'/>
        <AiOutlineLeft size={20} onClick={()=>handleClick('l')} className="absolute top-[40%] left-[-30px] group-hover:text-gray-500"/>
        <AiOutlineRight size={20} onClick={()=>handleClick('r')} className="absolute top-[40%] right-[-30px] group-hover:text-gray-500"/>
        <p className='absolute text-xs right-[-10px] bottom-[-10px] text-gray-500'>{(num + 1)} / {imgLenght}</p>
      </div>
      <p className="truncate mt-4">{products?.products[index].title}</p>
      <p className="text-xs">brand: {products?.products[index].brand}</p>
      <StarRating rating={products?.products[index].rating} />
      <p className="mt-2">${products?.products[index].price}
        <span className='text-xs text-gray-400 line-through ml-2'>${(products?.products[index].price! + (products?.products[index].price! * products?.products[index].discountPercentage!/100)).toFixed(2)}</span>
        <span className='text-xs font-semibold text-black ml-2'>{products?.products[index].discountPercentage}% OFF</span>
      </p>
      <p className="text-md font-mono max-w-[80%] truncate">{products?.products[index].description}</p>
      <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
        <p>Stocks: <span className='text-black'>{products?.products[index].stock}</span> </p>
        <p>Category: <span className='text-black'>{products?.products[index].category}</span></p>
      </div>
    </div>
  </div>  
  )
}

export default RowComponent