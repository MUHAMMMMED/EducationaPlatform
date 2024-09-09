import React from 'react'
import ErrorPage from '../Loading/ErrorPage'

export default function NotFound() {
  return (

    <ErrorPage head="404 Not Found" error={'The link you requested does not exist on our website.'} />

  )
}
