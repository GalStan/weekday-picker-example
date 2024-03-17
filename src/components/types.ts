export enum DayType {
  Weekday = 'WEEKDAY',
  Weekend = 'WEEKEND',
}

export interface Day {
  readonly selected: boolean
  readonly id: string
  readonly label: string
  readonly type: DayType
}

export type WeekState = ReadonlyArray<Day>
