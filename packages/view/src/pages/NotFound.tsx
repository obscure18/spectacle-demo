import { Center, Container, Space, Title } from '@mantine/core'

export const NotFound = () => {
  return (
    <Center>
      <Container>
        <Title align="center" order={1} sx={{ color: 'red' }}>
          404
        </Title>
        <Space h="sm" />
        <Title align="center" order={3}>
          Not Found
        </Title>
      </Container>
    </Center>
  )
}
