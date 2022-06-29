import { SpectacleEvent } from '@spectacle/domain'
import {
  Group,
  Image,
  Paper,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import dayjs from 'dayjs'
import { EventStatus } from './EventStatus'

export const Event = ({
  title,
  description,
  datetime,
  status,
  imageUrl,
}: SpectacleEvent) => {
  const formattedDate = dayjs(datetime).format('LLL')

  return (
    <Paper
      shadow="xs"
      p="md"
      sx={(theme) => ({
        color: theme.colors.neonPurple[8],
        backgroundColor: theme.colors.neonYellow[1],
      })}
    >
      <Group position="apart" align="top">
        <Stack align="left" spacing="sm">
          <Text size="sm">{formattedDate}</Text>
          <Title order={2}>{title}</Title>
        </Stack>
        <EventStatus status={status} />
      </Group>

      <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
        {imageUrl && (
          <Image
            ml="md"
            mb="md"
            sx={{ float: 'right' }}
            width={180}
            height={150}
            fit="contain"
            radius="md"
            src={imageUrl}
          />
        )}
        <Text dangerouslySetInnerHTML={{ __html: description }} />
        <Space h="lg" />
      </Spoiler>
    </Paper>
  )
}
