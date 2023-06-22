import { ReactNode } from 'react'

interface Props {
  children: ReactNode,
  skeletonComponent: any,
  isLoading: boolean
}
export const SkeletonContainer = ({ isLoading, skeletonComponent , children }: Props) => {
  if(isLoading) {
    return skeletonComponent
  }
  return children
}
