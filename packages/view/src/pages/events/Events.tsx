import { Button, Divider, Group, Space, Title } from '@mantine/core'
import { EventsList } from './EventsList'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../constants'

export const Events = () => {
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
          Events
        </Title>
        <Button onClick={() => navigate(routes.CREATE_EVENT)}>Create</Button>
      </Group>
      <Divider color="neonPurple" my="sm" />
      <Space h="lg" />
      <EventsList />
    </>
  )
}
