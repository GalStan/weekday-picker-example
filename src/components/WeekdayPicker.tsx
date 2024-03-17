import { Day, DayType, WeekState } from './types'
import { useCallback, useState } from 'react'
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

  return (
    <div>
      <div className={buttonsContainer}>
        <GroupToggle
          weekState={weekState}
          handleToggle={setWeekState}
          type={DayType.Weekday}
        >
          Weekdays
        </GroupToggle>
        <GroupToggle
          weekState={weekState}
          handleToggle={setWeekState}
          type={DayType.Weekend}
        >
          Weekends
        </GroupToggle>
        <GroupToggle weekState={weekState} handleToggle={setWeekState}>
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
