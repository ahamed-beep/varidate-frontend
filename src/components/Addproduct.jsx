import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postallproducts } from '../Redux/Product';

function Addproduct() {
  const [title , setTitle] = useState('');
  const [ price , setPrice] = useState('');
  const [discountSave , setdiscountSave] = useState('');
  const [discount , setDiscount] = useState('');
  const [category , setCategory] = useState('');
  const [image , setImage] = useState(null);
  const dispatch = useDispatch();

  const titlehandler = (e)=>{
    setTitle(e.target.value)
  };
  const pricehandler = (e)=>{
    setPrice(e.target.value)
  };
  const savehandler = (e)=>{
    setdiscountSave(e.target.value)
  };
  const discounthandler = (e)=>{
    setDiscount(e.target.value)
  };
  const cateforyhandler = (e)=>{
    setCategory(e.target.value)
  };
  const Imagehandler = (e)=>{
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            
        };
        reader.readAsDataURL(file);
    }
  };
  const data ={
    title,
    price,
    discount,
    discountSave,
    image,
    category
  }
  const formhandler = async(e)=>{
    e.preventDefault();
 const responce = await dispatch(postallproducts(data))
 if(responce){
  setTitle('');
  setPrice('');
  setdiscountSave('');
  setDiscount('');
  setImage('');
  setCategory('');
  console.log(responce)

 }
 else{
  console.log('error occured')
 }
   }
  return (
    <div>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Product Add Form
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form  onSubmit={formhandler} action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
             Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={titlehandler}
                  value={title}
                  autoComplete="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
               Price
              </label>
              <div className="mt-2">
                <input
                  id="Price"
                  name="Price"
                  type="text"
                  onChange={pricehandler}
                  value={price}
                
                  autoComplete="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Discount
              </label>
              <div className="mt-2">
                <input
                  id="Discount"
                  name="Discount"
                  type="text"
                  onChange={discounthandler}
                  value={discount}
                 
                  autoComplete="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Save
              </label>
              <div className="mt-2">
                <input
                  id="Save"
                  name="Save"
                  type="text"
                  onChange={savehandler}
                  value={discountSave}
                  
                  autoComplete="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
           <div>
  <label className="block text-sm font-medium text-gray-900">
    Select Section
  </label>
  <div className="mt-2">
    <div className="flex space-x-4">
      <label className="flex items-center">
        <input
          type="radio"
          name="section"
          onChange={cateforyhandler}
          value="section1"

          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <span className="ml-2 text-gray-900">Section 1</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="section"
          value="section2"
          onChange={cateforyhandler}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <span className="ml-2 text-gray-900">Section 2</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="section"
          value="section3"
          onChange={cateforyhandler}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <span className="ml-2 text-gray-900">Section 3</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="section"
          value="section4"
          onChange={cateforyhandler}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <span className="ml-2 text-gray-900">Section 4</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="section"
          value="section5"
          onChange={cateforyhandler}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <span className="ml-2 text-gray-900">Section 5</span>
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          name="section"
          value="section6"
          onChange={cateforyhandler}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
        />
        <span className="ml-2 text-gray-900">Section 6</span>
      </label>
    </div>
  </div>
</div>


            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Image
                </label>
             
              </div>
              <div className="mt-2">
                <input
                  id="Image"
                  name="Image"
                  type="file"
                  onChange={Imagehandler}
                  autoComplete="file"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>

     
        </div>
      </div>
    </div>
  )
}

export default Addproduct
