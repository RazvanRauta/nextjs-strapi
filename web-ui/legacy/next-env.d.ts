/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'
  export default typeof DocumentNode
}

declare module '*.yml'

declare module '*.svg' {
  const content: string
  export default content
}
