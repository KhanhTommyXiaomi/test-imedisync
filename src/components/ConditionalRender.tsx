import { Fragment, ReactNode } from 'react'

const ConditionalRender = (props: {
  conditional: boolean
  children: ReactNode
  fallback?: any
}) => {
  const { conditional, fallback = <Fragment />, children } = props
  return conditional ? children : fallback
}

export default ConditionalRender
