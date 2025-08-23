import React from 'react'

const Search = ({searchTearm,setSearchTerm}) => {
  return (
      <>
      <div className= 'w-full bg-light-100/5 px-4  py-3 rounded-lg mt-10 max-w-3xl mx-auto'>
        <div className='flex items-center gap-2 relative'>
            <img src="/search.png" alt="search" className='h-5 w-5'/>
            <input type="text" 
                    className='w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 
                            placeholder-light-200 outline-none border-none' 
            placeholder='Search through 300+ movies'    
            value={searchTearm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              event.preventDefault();
            }
            }
            />
        </div>
    </div>
    </>
  )
}

export default Search