export interface ActionSet {
  primary?: () => void
  left?: () => void
  right?: () => void
}

export type RegisterFn = (a: ActionSet | null) => void
