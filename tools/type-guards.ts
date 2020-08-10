export function isString(value): value is string {
  return typeof value === 'string' || value instanceof String
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isNumber(value): value is number {
  return typeof value === 'number'
}

export function isNaN(value) {
  return Number.isNaN(value)
}

export function isBoolean(value): value is boolean {
  return typeof value === 'boolean'
}

export function isNull(value): value is null {
  return value === null
}

export function isUndefined(value): value is undefined {
  return typeof value === 'undefined'
}

export function isDefined(value) {
  return !isNull(value) && !isUndefined(value)
}
