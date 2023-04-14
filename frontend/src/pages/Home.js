import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { FormModal } from "../component/FormModal"
import { getAll } from "../api/obituary.api"
import Item from "../component/Item"

export function Home() {
  const [showForm, setShowForm] = useState(false)
  const [allObituaries, setAllObituaries] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    async function fetchAllObituaries() {
       setLoading(true)
       const data = await getAll()
       setAllObituaries(data)
    }
    fetchAllObituaries()
    setLoading(false)
  },[])

  return (
    loading?
    <div>
        <p>Loading</p>
    </div>
    :
    <div>
      <Navbar showForm={showForm} setShowForm={setShowForm}></Navbar>
      <div className="items-center">
        {
            allObituaries?.items?.length > 0?
            allObituaries.items.map((item, id) => {
                return <Item key={id} {...item}></Item>
            })
            :
            ""
        }
      </div>

      <FormModal showForm={showForm} setShowForm={setShowForm}></FormModal>

    </div>
  )
}
