import { Day, DayType, WeekState } from './types'
import { useCallback, useMemo, useState } from 'react'
import { Button } from './Button'
import { buttonsContainer, weekend } from './WeekdayPicker.module.css'
import { clsx } from 'clsx'
import { GroupToggle } from './GroupToggle'

const initialState: WeekState = [
  { id: 'monday', label: 'Mon', selected: false, type: DayType.Weekday },
  { id: 'tuesday', label: 'Tue', selected: false, type: DayType.Weekday },
  { id: 'wednesday', label: 'Wed', selected: false, type: DayType.Weekday },
  { id: 'thursday', label: 'Thu', selected: false, type: DayType.Weekday },
  { id: 'friday', label: 'Fri', selected: false, type: DayType.Weekday },
  { id: 'saturday', label: 'Sat', selected: false, type: DayType.Weekend },
  { id: 'sunday', label: 'Sun', selected: false, type: DayType.Weekend },
]

const deyTypeWeightMap: Record<DayType, number> = {
  [DayType.Weekday]: 1,
  [DayType.Weekend]: 10,
}

export const WeekdayPicker = () => {
  const [weekState, setWeekState] = useState(initialState)

  const handleDayClick = useCallback((dayId: string) => {
    setWeekState((prevState) =>
      prevState.reduce((acc, nextDay) => {
        if (nextDay.id === dayId) {
          acc.push({ ...nextDay, selected: !nextDay.selected })
        } else {
          acc.push(nextDay)
        }

        return acc
      }, [] as Array<Day>)
    )
  }, [])

  const stateHash = useMemo(
    () =>
      weekState.reduce((acc, next) => {
        if (next.selected) {
          return acc + deyTypeWeightMap[next.type]
        }
        return acc
      }, 0),
    [weekState]
  )

  const hadleeGroupToggle = useCallback(
    (isSelected: boolean, type?: DayType) =>
      setWeekState((prevState) =>
        isSelected
          ? prevState.map((day) => ({
              ...day,
              selected: false,
            }))
          : prevState.map((day) => ({
              ...day,
              selected: type ? day.type === type : true,
            }))
      ),
    []
  )

  return (
    <div>
      <div className={buttonsContainer}>
        <GroupToggle
          isSelected={stateHash === 5}
          handleToggle={useCallback(
            () => hadleeGroupToggle(stateHash === 5, DayType.Weekday),
            [hadleeGroupToggle, stateHash]
          )}
        >
          Weekdays
        </GroupToggle>
        <GroupToggle
          isSelected={stateHash === 20}
          handleToggle={useCallback(
            () => hadleeGroupToggle(stateHash === 20, DayType.Weekend),
            [hadleeGroupToggle, stateHash]
          )}
        >
          Weekends
        </GroupToggle>
        <GroupToggle
          isSelected={stateHash === 25}
          handleToggle={useCallback(
            () => hadleeGroupToggle(stateHash === 25),
            [hadleeGroupToggle, stateHash]
          )}
        >
          All days
        </GroupToggle>
      </div>
      <div>
        {weekState.map((day) => (
          <Button
            key={day.id}
            onClick={() => handleDayClick(day.id)}
            active={day.selected}
            className={clsx(day.type === DayType.Weekend && weekend)}
          >
            {day.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
