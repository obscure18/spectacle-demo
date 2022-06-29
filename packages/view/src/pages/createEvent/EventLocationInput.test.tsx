import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  MockInstance,
  vi,
} from 'vitest'
import { act, fireEvent, render, RenderResult } from '@testing-library/react'
import { EventLocationInput, Props } from './EventLocationInput'
import { usePlacesWidget } from 'react-google-autocomplete'

vi.mock('react-google-autocomplete', async () => ({
  usePlacesWidget: vi.fn(),
}))

describe('<EventLocationInput />', () => {
  let result: RenderResult | null = null
  const mockedOnChange = vi.fn()
  let props: Props = {
    error: undefined,
    onChange: mockedOnChange,
  }
  const mockRef = vi.fn()

  const renderComponent = async () => {
    result = render(<EventLocationInput {...props} />)
  }

  beforeEach(() => {
    props = {
      error: undefined,
      onChange: mockedOnChange,
    }
    ;(usePlacesWidget as unknown as MockInstance).mockReturnValue({
      ref: mockRef,
    })
    renderComponent()
  })

  afterEach(() => {
    result = null
  })

  const elements = {
    get input() {
      return result?.queryByRole('textbox')
    },
    get errorText() {
      return result?.queryByText(
        'Please select a valid location from the autocomplete options'
      )
    },
  }

  it("should call google's usePlacesWidget hook with right configs", () => {
    expect(usePlacesWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: expect.any(String),
        options: {
          componentRestrictions: { country: 'ca' },
          types: ['address'],
        },
      })
    )
  })

  describe('given onPlaceSelected is called with a valid location', () => {
    const fakeAddress = '123 Yonge St., Toronto, Canada'
    beforeEach(() => {
      const onPlaceSelected = (usePlacesWidget as unknown as MockInstance).mock
        .calls[0]?.[0]?.onPlaceSelected

      act(() => {
        onPlaceSelected({
          formatted_address: fakeAddress,
          geometry: { location: { lng: () => 50, lat: () => 120 } },
        })
      })
    })

    it('should call the onChange prop with geopoints', () => {
      expect(mockedOnChange).toHaveBeenCalledWith({
        longitude: 50,
        latitude: 120,
      })
    })

    describe("given there's a change directly on the text field which changes the location", () => {
      beforeEach(() => {
        fireEvent.change(elements.input!, {
          target: { value: 'toronto' },
        })
      })

      it('should call the onChange prop with undefined', async () => {
        expect(mockedOnChange).toHaveBeenCalledWith(undefined)
      })
    })

    describe("given there's a change directly on the text field which does not change the location", () => {
      beforeEach(() => {
        fireEvent.change(elements.input!, {
          target: { value: fakeAddress },
        })
      })

      it('should not call the onChange prop with undefined', async () => {
        expect(mockedOnChange).not.toHaveBeenCalledWith(undefined)
      })
    })
  })

  it('should return an input that matches snapshot', () => {
    expect(elements.input).toMatchInlineSnapshot(`
      <input
        aria-invalid="false"
        class="mantine-TextInput-defaultVariant mantine-TextInput-input mantine-g773hu"
        id="google-autocomplete-location-input"
        type="text"
      />
    `)
  })

  describe('given there is an error', () => {
    beforeEach(() => {
      props.error = <>Error!</>
      renderComponent()
    })

    it('should display an error', () => {
      expect(elements.errorText).toBeTruthy()
    })
  })

  describe('given there is no error', () => {
    beforeEach(() => {
      props.error = undefined
      renderComponent()
    })

    it('should not display an error', () => {
      expect(elements.errorText).toBeFalsy()
    })
  })
})
