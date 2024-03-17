import { PropsWithChildren, useMemo } from 'react'
import { DayType, WeekState } from '../types'
import { Button } from '../Button'

interface GroupToggleProps extends PropsWithChildren {
  readonly type?: DayType
  readonly weekState: WeekState
  readonly handleToggle: (weekState) => void
}

export const GroupToggle = ({
  type,
  weekState,
  handleToggle,
  children,
}: GroupToggleProps) => {
  const isGroupSelected = useMemo(
    () =>
      weekState.every(({ type: dayType, selected }) =>
        !type || dayType === type ? selected : !selected
      ),
    [type, weekState]
  )

  return (
    <Button
      size="large"
      active={isGroupSelected}
      onClick={() =>
        handleToggle(
          isGroupSelected
            ? weekState.map((day) => ({
                ...day,
                selected: false,
              }))
            : weekState.map((day) => ({
                ...day,
                selected: type ? day.type === type : true,
              }))
        )
      }
    >
      {children}
    </Button>
  )
}
