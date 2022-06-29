import { Badge } from '@mantine/core'

export const EventStatus = ({ status }: { status: string }) => {
  return {
    active: <Badge color="neonPurple">Open</Badge>,
    cancelled: <Badge color="neonRed">Cancelled</Badge>,
  }[status]!
}
