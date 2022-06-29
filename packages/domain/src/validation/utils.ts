export type ValidationResult = string | undefined
export type ValidationType<T> = {
  [K in keyof T]: ((value: T[K] | undefined) => ValidationResult) | null
}

export const isEmpty = (value: string | undefined) =>
  value === undefined || value.trim() === ''

export const isLatitude = (num: number) =>
  Number.isFinite(num) && Math.abs(num) <= 90
export const isLongitude = (num: number) =>
  Number.isFinite(num) && Math.abs(num) <= 180

export const isValidImageUrl = (urlString: string) =>
  /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)((\?.*)$|$)/.test(urlString)

export const runValidation = <T extends Record<string, any>>(
  values: T,
  validationObject: ValidationType<T>
) => {
  return Object.keys(validationObject).reduce((results, key: string) => {
    results[key] = validationObject[key]?.(values[key])
    return results
  }, {} as Record<string, ValidationResult>)
}
