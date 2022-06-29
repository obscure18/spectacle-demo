import { useCreateEventForm } from './useCreateEventForm'
import {
  Alert,
  Box,
  Button,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Space,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { RichTextEditor } from '@mantine/rte'
import { ImageUploader } from './ImageUploader'
import { EventLocationInput } from './EventLocationInput'
import { useMediaQuery } from '@mantine/hooks'
import { EventDateTimePicker } from './EventDateTimePicker'

export const CreateEventForm = () => {
  const { form, createMutation } = useCreateEventForm()
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <Paper
      shadow="xs"
      p="md"
      sx={(theme) => ({
        color: theme.colors.neonPurple[8],
        backgroundColor: theme.colors.neonYellow[1],
      })}
    >
      {createMutation.isError && (
        <>
          <Alert title="Error while creating the event!" color="red">
            There has been a problem attempting to save your event. Please try
            later.
          </Alert>
          <Space h="lg" />
        </>
      )}

      {createMutation.isSuccess && (
        <>
          <Alert title="Success!" color="green">
            You have successfully created your event! Go back to events page to
            see it :)
          </Alert>
          <Space h="lg" />
        </>
      )}

      <form onSubmit={form.onSubmit(() => createMutation.mutate(form.values))}>
        <SimpleGrid cols={isMobile ? 1 : 2}>
          <Box>
            <TextInput
              label="Title"
              placeholder="New Event"
              {...form.getInputProps('title')}
            />
            <Space h="lg" />
            <EventLocationInput
              label="Location"
              placeholder="Enter the event's location"
              {...form.getInputProps('location')}
            />
            <Space h="lg" />
            <EventDateTimePicker {...form.getInputProps('datetime')} />
          </Box>
          <Box mt={16} ml={isMobile ? 0 : 8}>
            {form.getInputProps('imageUrl').value ? (
              <Image
                fit="contain"
                radius="md"
                height={220}
                src={form.getInputProps('imageUrl').value}
              />
            ) : (
              <ImageUploader
                onUploaded={(imageUrl: string) =>
                  form.getInputProps('imageUrl').onChange(imageUrl)
                }
              />
            )}
          </Box>
        </SimpleGrid>
        <Space h="lg" />
        <RichTextEditor
          sx={{ minHeight: 200 }}
          placeholder="Enter your event's description here!"
          controls={[
            ['bold', 'italic', 'underline', 'strike', 'clean'],
            ['unorderedList', 'orderedList', 'link'],
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          ]}
          {...form.getInputProps('description')}
        />
        <Group position="right" mt="md">
          <Button loading={createMutation.isLoading} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  )
}
