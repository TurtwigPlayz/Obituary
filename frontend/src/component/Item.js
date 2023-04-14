import React from "react"
import { convertDate } from "../utils/date.utils"

export default function Item({name, birthDate, deathDate, imageRef, obituaryText} ) {
    const formattedBirthDate = convertDate(birthDate)
    const formattedDeathDate = convertDate(deathDate)

    return (
        <article className='item'>
          <div className='img-container'>
            <img src={imageRef} alt={name} />
          </div>
          <div className='item-footer'>
            <h3>{name}</h3>
            <p>{formattedBirthDate} - {formattedDeathDate}</p>

            {/* <p className="obituary-text">{obituaryText}</p> */}

          </div>
        </article>
      )
}