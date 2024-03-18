import { memo, PropsWithChildren } from 'react'
import { Button } from '../Button'

interface GroupToggleProps extends PropsWithChildren {
  readonly isSelected: boolean
  readonly handleToggle: () => void
}

export const GroupToggle = memo(
  ({ handleToggle, children, isSelected }: GroupToggleProps) => {
    return (
      <Button size="large" active={isSelected} onClick={handleToggle}>
        {children}
      </Button>
    )
  }
)
