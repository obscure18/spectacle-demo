import { ValidationType } from '@spectacle/domain'

export const toMantineValidation = <T extends { [key: string]: any }>(
  validation: ValidationType<T>
) =>
  Object.keys(validation).reduce((accumulator, key: string) => {
    return {
      ...accumulator,
      [key]: (value: any) => {
        const error = validation[key]?.(value)

        if (error) return <>{error}</>
        return null
      },
    }
  }, {})
