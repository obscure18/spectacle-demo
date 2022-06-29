import { useForm } from '@mantine/form'
import { SpectacleEvent, spectacleEventValidation } from '@spectacle/domain'
import { toMantineValidation } from '../../utils/toMantineValidation'
import { createEvent } from '../../api/createEvent'
import { useMutation } from 'react-query'

export const useCreateEventForm = () => {
  const form = useForm<SpectacleEvent>({
    initialValues: {
      title: '',
      description: '',
      location: undefined as never,
      datetime: undefined as never,
      status: 'active',
      imageUrl: '',
    },
    validate: toMantineValidation(spectacleEventValidation),
  })

  const createMutation = useMutation((values: SpectacleEvent) =>
    createEvent(values)
  )

  return { form, createMutation }
}
