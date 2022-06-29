import { ReactNode, useCallback } from 'react'
import { DatePicker, TimeInput } from '@mantine/dates'
import { Group, Indicator } from '@mantine/core'
import dayjs from 'dayjs'

export type Props = {
  value: Date
  onChange(event: any): void
  error?: ReactNode
}
export const EventDateTimePicker = ({ error, value, onChange }: Props) => {
  const onDateChange = useCallback(
    (date: Date) => {
      const currentDate = new Date(value)
      currentDate.setDate(date.getDate())
      currentDate.setMonth(date.getMonth())
      currentDate.setFullYear(date.getFullYear())
      onChange(currentDate)
    },
    [onChange, value]
  )

  const onTimeChange = useCallback(
    (date: Date) => {
      console.log(date)
      const currentDate = new Date(value)
      currentDate.setHours(date.getHours())
      currentDate.setMinutes(date.getMinutes())
      onChange(currentDate)
    },
    [onChange, value]
  )

  return (
    <Group grow={true}>
      <DatePicker
        id="event-datetime-picker-date"
        placeholder="Pick date"
        label="Event date"
        allowFreeInput
        minDate={dayjs().toDate()}
        error={error}
        value={value}
        onChange={onDateChange}
        renderDay={(date) => (
          <Indicator
            size={6}
            color="neonRed"
            offset={8}
            disabled={!dayjs().isSame(date, 'day')}
          >
            <div>{date.getDate()}</div>
          </Indicator>
        )}
      />
      <TimeInput
        id="event-datetime-picker-time"
        // ‎ : invisible character to enable error style too
        error={error ? '‎' : undefined}
        onChange={onTimeChange}
        label="Event time"
      />
    </Group>
  )
}
