import React from 'react'
import Charts from './Charts'

const Assets = () => {
  return (
    <div className='h-auto w-auto flex flex-col items-center'>
        <div className='bg-blue-950 h-[20rem] w-[20rem]'>
            <Charts chartType = "Bar" tag = {true}/>

        </div>

    </div>
  )
}

export default Assets