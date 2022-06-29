import { useQuery } from 'react-query'
import { queryKeys } from '../../constants'
import { listEvents } from '../../api/listEvents'
import { Alert, Loader, Space } from '@mantine/core'
import { SpectacleEvent } from '@spectacle/domain'
import { Event } from '../../common'

export const EventsList = () => {
  const { isLoading, isError, data } = useQuery(
    queryKeys.listEvents,
    listEvents
  )

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <Alert title="Bummer!" color="red">
        There was a problem loading the events, please try again later!
      </Alert>
    )
  }

  return (
    <>
      {data?.map((event: SpectacleEvent) => (
        <>
          <Event key={event.title} {...event} />
          <Space h="md" />
        </>
      ))}
    </>
  )
}
