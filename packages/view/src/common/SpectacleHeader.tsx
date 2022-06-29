import { Header, Title } from '@mantine/core'

export const SpectacleHeader = () => {
  return (
    <Header height={70} p="md">
      <Title
        sx={(theme) => ({
          color: theme.colors.neonOrange[4],
        })}
        order={2}
      >
        {`👯 `}Spectacle
      </Title>
    </Header>
  )
}
