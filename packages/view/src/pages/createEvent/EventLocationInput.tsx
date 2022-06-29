import { ReactNode, Ref, useCallback, useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import { TextInput } from '@mantine/core'

export type Props = {
  label?: string
  placeholder?: string
  error?: ReactNode
  onChange: (event: any) => void
}

export const EventLocationInput = ({
  onChange,
  label,
  placeholder,
  error,
}: Props) => {
  const [validLocation, setValidLocation] = useState(undefined)

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyCksuRHwTOUB0wj_nL21enrm84HuuPsSbo',
    options: {
      componentRestrictions: { country: 'ca' },
      types: ['address'],
    },
    onPlaceSelected: (place) => {
      setValidLocation(place.formatted_address)
      onChange({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      })
    },
  })

  // To enforce selecting an option from the auto-suggestion
  // and to avoid bug when we re-select the same location from the options
  const handleChange = useCallback(
    (event: any) => {
      if (validLocation !== event.target.value) {
        onChange(undefined)
        setValidLocation(undefined)
      }
    },
    [onChange, validLocation, setValidLocation]
  )

  return (
    <TextInput
      id="google-autocomplete-location-input"
      label={label}
      placeholder={placeholder}
      ref={ref as unknown as Ref<HTMLInputElement>}
      error={
        error
          ? 'Please select a valid location from the autocomplete options'
          : undefined
      }
      onChange={handleChange}
    />
  )
}
