import { Button, Divider, Group, Title } from '@mantine/core'
import { CreateEventForm } from './CreateEventForm'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../constants'

export const CreateEvent = () => {
  const navigate = useNavigate()

  return (
    <>
      <Group position="apart">
        <Title
          order={1}
          sx={(theme) => ({
            color: theme.colors.neonPurple[9],
          })}
        >
          Create event
        </Title>
        <Button onClick={() => navigate(routes.EVENTS)}>Back</Button>
      </Group>
      <Divider color="neonPurple" my="sm" />
      <CreateEventForm />
    </>
  )
}
