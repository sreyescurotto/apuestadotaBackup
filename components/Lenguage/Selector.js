import React from 'react'
import { useRouter } from 'next/router'
import ReactSelect from 'react-select'


export default function Selector() {
    const router = useRouter()
    const changeLanguage = (e) => {
       router.push(router.pathname, router.pathname, { locale: e.value }) 
    }
    const countries = [
        { value: 'en', label: 'EN', image: '/icons/britain-24.png' },
        { value:'es', label: 'ES', image: '/icons/spain-24.png' }
      ]

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'red' : 'blue',
          padding: 10,
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: 80,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      }
  return (

    <ReactSelect
        onChange={changeLanguage}
        value={countries.find(obj => obj.value === router.locale)}
        instanceId="language-selector"
        options={countries}
        styles={customStyles}
        isSearchable={false}
        theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: 'lightblue',
        primary: '#b6ff40',
        neutral0: 'transparent',
      },
      background: 'transparent',
    })}
        formatOptionLabel={country => (
          <div className="country-option">
            <img src={country.image} alt="country-image" />
          </div>
        )}
      />  



  )
}

