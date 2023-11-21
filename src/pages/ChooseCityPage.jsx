import React from 'react'

function ChooseCityPage() {
    const cityClick = (id) => {
    };

    const city = [
        {
            id: "1",
            cityName: "Dallas",
            value: "GA",
        },
        {
            id: "2",
            cityName: "Dallas2",
            value: "DA",
        },
      ]

  return (
    <>
    {city?.map((item, index)=>(
        <h1>{item.cityName}</h1>
    ))}
    </>
  )
}

export default ChooseCityPage