import { beforeEach, describe, it, expect, vi, beforeAll } from 'vitest'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { EventDateTimePicker, Props } from './EventDateTimePicker'

describe('<EventDateTimePicker />', () => {
  describe('Timezones', () => {
    it('should always be UTC', () => {
      expect(new Date().getTimezoneOffset()).toBe(0)
    })
  })

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: (query: any) => ({
        matches: false,
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    })
  })

  const TODAY = new Date('2000-01-01T00:00:00.000Z')

  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(TODAY)
  })

  let result: RenderResult | null = null
  const mockedOnChange = vi.fn()
  let props: Props = {
    value: new Date(),
    error: undefined,
    onChange: mockedOnChange,
  }

  const renderComponent = async () => {
    result = render(<EventDateTimePicker {...props} />)
  }

  const elements = {
    get hoursInput() {
      return result?.getByRole('textbox', {
        name: 'Event time',
      })
    },
    get dateInput() {
      return result?.getByRole('textbox', { name: 'Event date' })
    },
    get minutesInput() {
      return result
        ?.getAllByRole('textbox')
        .find(
          (input) =>
            ![
              'event-datetime-picker-date',
              'event-datetime-picker-time',
            ].includes(input.id)
        )
    },
  }

  beforeEach(() => {
    props = {
      error: undefined,
      onChange: mockedOnChange,
      value: new Date(),
    }
  })

  describe('given there is an error', () => {
    beforeEach(() => {
      props.error = 'The date is invalid'
      renderComponent()
    })

    it('should display the error', () => {
      expect(result?.queryByText('The date is invalid')).toBeTruthy()
    })
  })

  describe('given there is no error', () => {
    beforeEach(() => {
      props.error = undefined
      renderComponent()
    })

    it('should match hoursInput snapshot', () => {
      expect(elements.hoursInput).toMatchInlineSnapshot(`
        <input
          class="mantine-TimeInput-timeInput mantine-1txq2ya"
          id="event-datetime-picker-time"
          inputmode="numeric"
          placeholder="--"
          type="text"
          value=""
        />
      `)
    })

    it('should match date snapshot', () => {
      expect(elements.dateInput).toMatchInlineSnapshot(`
        <input
          aria-invalid="false"
          autocomplete="off"
          class="mantine-DatePicker-defaultVariant mantine-DatePicker-input __mantine-ref-freeInput mantine-DatePicker-freeInput mantine-DatePicker-input mantine-1dhkkkk"
          id="event-datetime-picker-date"
          name="date"
          placeholder="Pick date"
          value="January 1, 2000"
        />
      `)
    })

    describe('given we change the date', () => {
      const newDate = new Date('2001-01-01')
      beforeEach(() => {
        fireEvent.change(elements.dateInput!, {
          target: { value: newDate },
        })
      })

      it('should call onChange prop with the new date without time', () => {
        expect(mockedOnChange).toHaveBeenCalledWith(newDate)
      })
    })

    describe('given we change the hours on the hours input', () => {
      beforeEach(() => {
        fireEvent.change(elements.hoursInput!, {
          target: { value: 20 },
        })
      })

      it('should call onChange prop with only the hours changed', () => {
        const todayWithHoursChanged = new Date(TODAY)
        todayWithHoursChanged.setHours(20)
        expect(mockedOnChange).toHaveBeenCalledWith(todayWithHoursChanged)
      })
    })

    describe('given we change the minutes on the minutes input', () => {
      beforeEach(() => {
        fireEvent.change(elements.minutesInput!, {
          target: { value: 30 },
        })
      })

      it('should call onChange prop with the right minutes value', () => {
        const todayWithMinutesChanged = new Date(TODAY)
        todayWithMinutesChanged.setMinutes(30)
        expect(mockedOnChange).toHaveBeenCalledWith(todayWithMinutesChanged)
      })
    })
  })
})
