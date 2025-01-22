import React, { useEffect, useRef, useState } from 'react'

//value and delay will send to debounce the input elements

const useDebounce = (value,delay) => {
    const [debounceValue, setDebounceValue] = useState(value)
    const timeoutRef = useRef(null)

    const cancel =()=>{
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
    };

    useEffect(()=>{
        timeoutRef.current = setTimeout(() => {
           setDebounceValue(value) 
        }, delay);
        return(()=>{
            cancel()
        });
    },[value, delay])

  return[debounceValue, cancel]
}

export default useDebounce