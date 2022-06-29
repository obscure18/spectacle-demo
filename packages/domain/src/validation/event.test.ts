import { spectacleEventValidation } from './event'

describe('spectacleEventValidation', () => {
  const TODAY = new Date('2000-01-01T00:00:00.000Z')

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(TODAY)
  })

  describe('location validation', () => {
    describe.each([
      [120, 91, 'The latitude must be a number between -90 and 90.'],
      [120, -91, 'The latitude must be a number between -90 and 90.'],
      [120, NaN, 'The latitude must be a number between -90 and 90.'],
      [120, Infinity, 'The latitude must be a number between -90 and 90.'],
      [120, -Infinity, 'The latitude must be a number between -90 and 90.'],
      [181, 90, 'The longitude must be a number between -180 and 180.'],
      [-181, 90, 'The longitude must be a number between -180 and 180.'],
      [NaN, 78, 'The longitude must be a number between -180 and 180.'],
      [Infinity, 78, 'The longitude must be a number between -180 and 180.'],
      [-Infinity, 78, 'The longitude must be a number between -180 and 180.'],
      [
        NaN,
        NaN,
        'The latitude must be a number between -90 and 90 and the longitude between -180 and 180.',
      ],
      [
        181,
        -91,
        'The latitude must be a number between -90 and 90 and the longitude between -180 and 180.',
      ],
      [
        -181,
        91,
        'The latitude must be a number between -90 and 90 and the longitude between -180 and 180.',
      ],
      [-150, 50, undefined],
    ])(
      'given longitude is %i and latitude is %i',
      (longitude: number, latitude: number, expected: string | undefined) => {
        it(`should return "${expected}"`, () => {
          expect(
            spectacleEventValidation.location!({ latitude, longitude })
          ).toBe(expected)
        })
      }
    )

    describe('given location is undefined', () => {
      it("should return 'You must define a location for your event.'", () => {
        expect(spectacleEventValidation.location!(undefined)).toBe(
          'You must define a location for your event.'
        )
      })
    })
  })

  describe('datetime validation', () => {
    describe.each([
      [new Date('1999-01-01'), 'The date of the event must be today or later'],
      [
        new Date('1999-12-31T23:59:59.000Z'),
        'The date of the event must be today or later',
      ],
      [new Date('2000-01-01T00:00:01.000Z'), undefined],
      [TODAY, undefined],
      [undefined, 'The date of the event must be today or later'],
    ])(
      'given date is %p',
      (date: Date | undefined, expected: string | undefined) => {
        it(`should return ${expected}`, () => {
          expect(spectacleEventValidation.datetime!(date)).toBe(expected)
        })
      }
    )
  })

  describe('title validation', () => {
    describe.each([
      ['', 'The event name should not be empty.'],
      ['A great event!', undefined],
    ])('given title is %p', (title: string, expected: string | undefined) => {
      it(`should return ${expected}`, () => {
        expect(spectacleEventValidation.title!(title)).toBe(expected)
      })
    })
  })

  describe('description validation', () => {
    describe.each([
      ['', "The event's description should not be empty."],
      ['Come to our great event, it will be great!', undefined],
    ])(
      'given description is %p',
      (description: string, expected: string | undefined) => {
        it(`should return ${expected}`, () => {
          expect(spectacleEventValidation.description!(description)).toBe(
            expected
          )
        })
      }
    )
  })

  describe('status validation', () => {
    describe.each([
      ['active', undefined],
      ['cancelled', undefined],
      [
        'pending',
        "Status can only be one of the following : 'active', 'cancelled'",
      ],
      ['', 'Please specify the event status'],
    ])('given status is %p', (status: string, expected: string | undefined) => {
      it(`should return ${expected}`, () => {
        expect(spectacleEventValidation.status!(status)).toBe(expected)
      })
    })
  })

  describe('imageUrl validation', () => {
    describe.each([
      ['https://images.com/an-image.png', undefined],
      ['https://images.com/an-html-file.html', 'The image url is not valid.'],
      ['', undefined],
      [
        'https://firebasestorage.googleapis.com/v0/b/projectname.appspot.com/o/dir%2Fsomeimage-JPEG.jpg?alt=media&token=sdsdfsdfsd51f01',
        undefined,
      ],
      ['https://badurl', 'The image url is not valid.'],
      ['https://badurl.com/okay?its=not-valid', 'The image url is not valid.'],
    ])(
      'given imageUrl is %p',
      (imageUrl: string, expected: string | undefined) => {
        it(`should return ${expected}`, () => {
          expect(spectacleEventValidation.imageUrl!(imageUrl)).toBe(expected)
        })
      }
    )
  })
})
