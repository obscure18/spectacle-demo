import {
  describe,
  vi,
  beforeAll,
  beforeEach,
  afterEach,
  it,
  expect,
  MockInstance,
} from 'vitest'
import { act, fireEvent, render, RenderResult } from '@testing-library/react'
import { ImageUploader, Props } from './ImageUploader'
import { uploadImage } from '../../api/uploadImage'

vi.mock('../../api/uploadImage', () => ({ uploadImage: vi.fn() }))

describe('<ImageUploader />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: (query: any) => ({
        matches: false,
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    })
  })

  let result: RenderResult | null = null
  let props: Props = {
    onUploaded: vi.fn(),
  }

  const renderComponent = async () => {
    result = render(<ImageUploader {...props} />)
  }

  const elements = {
    get dropzone() {
      return result?.queryByTestId('image-uploader')
    },
  }

  const dropFile = (format: string) => {
    Object.defineProperty(elements.dropzone, 'files', {
      value: [
        new File(['file'], 'ping', {
          type: format, //'application/json',
        }),
      ],
    })
    fireEvent.drop(elements.dropzone!)
  }

  afterEach(() => {
    result = null
  })

  beforeEach(() => {
    renderComponent()
  })

  describe('given we drop a valid file', () => {
    beforeEach(() => {
      dropFile('image/png')
    })

    it('should call uploadImage with callbacks', () => {
      expect(uploadImage).toHaveBeenCalledWith(
        expect.any(File),
        expect.objectContaining({
          onProgress: expect.any(Function),
          onSuccess: expect.any(Function),
          onFailure: expect.any(Function),
        })
      )
    })

    describe('given the upload is in progress', () => {
      beforeEach(() => {
        const onProgressCallback = (uploadImage as unknown as MockInstance).mock
          .calls[0]?.[1].onProgress
        act(() => onProgressCallback(20))
      })

      it('should match the uploaded file snapshot', async () => {
        expect(elements.dropzone).toMatchInlineSnapshot(`
        <div
          class="mantine-Dropzone-root mantine-bx0zqe"
          data-testid="image-uploader"
          role="button"
          style="height: 100%;"
          tabindex="0"
        >
          <input
            accept="image/png,image/gif,image/jpeg,image/svg+xml,image/webp"
            autocomplete="off"
            style="display: none;"
            tabindex="-1"
            type="file"
          />
          <div
            class="mantine-Stack-root mantine-1eyjlke"
            style="pointer-events: none;"
          >
            <div
              class="mantine-Text-root mantine-13bpxe2"
            >
              Upload in progress
            </div>
            <div
              class="mantine-Progress-root mantine-syiqbm"
            >
              <div
                aria-valuemax="100"
                aria-valuemin="0"
                aria-valuenow="20"
                class="mantine-ii0spb mantine-Progress-bar"
                role="progressbar"
                style="width: 20%;"
              />
            </div>
          </div>
        </div>
      `)
      })
    })

    describe('given the upload failed', () => {
      beforeEach(() => {
        const onFailureCallback = (uploadImage as unknown as MockInstance).mock
          .calls[0]?.[1].onFailure
        act(() => onFailureCallback())
      })

      it('should match the error snapshot', async () => {
        expect(elements.dropzone).toMatchInlineSnapshot(`
          <div
            class="mantine-Dropzone-root mantine-bx0zqe"
            data-testid="image-uploader"
            role="button"
            style="height: 100%;"
            tabindex="0"
          >
            <input
              accept="image/png,image/gif,image/jpeg,image/svg+xml,image/webp"
              autocomplete="off"
              style="display: none;"
              tabindex="-1"
              type="file"
            />
            <div
              class="mantine-Stack-root mantine-1eyjlke"
              style="pointer-events: none;"
            >
              <div
                class="mantine-Text-root mantine-1vhis6g"
              >
                ❌
                 There has been an error.
              </div>
              <div
                class="mantine-Text-root mantine-4k0hyy"
              >
                Try again, make sure your image is in the correct format and does not exceed 3MB. Accepted formats are : .png, .gif, .jpeg, .svg and .webp
              </div>
            </div>
          </div>
        `)
      })
    })

    describe('given the upload is completed', () => {
      beforeEach(() => {
        const onSuccessCallback = (uploadImage as unknown as MockInstance).mock
          .calls[0]?.[1].onSuccess
        act(() => onSuccessCallback())
      })

      it('should match the success snapshot', async () => {
        expect(elements.dropzone).toMatchInlineSnapshot(`
          <div
            class="mantine-Dropzone-root mantine-bx0zqe"
            data-testid="image-uploader"
            role="button"
            style="height: 100%;"
          >
            <input
              accept="image/png,image/gif,image/jpeg,image/svg+xml,image/webp"
              autocomplete="off"
              style="display: none;"
              tabindex="-1"
              type="file"
            />
            <div
              class="mantine-Stack-root mantine-1eyjlke"
              style="pointer-events: none;"
            >
              <div
                class="mantine-Text-root mantine-1k3aqg4"
              >
                Uploaded! 
                ✅
              </div>
            </div>
          </div>
        `)
      })
    })
  })

  describe('given we drop an invalid file', () => {
    beforeEach(() => {
      dropFile('application/json')
    })

    it('should not call uploadImage', () => {
      expect(uploadImage).not.toHaveBeenCalled()
    })

    it('should match error snapshot', () => {
      expect(elements.dropzone).toMatchInlineSnapshot(`
        <div
          class="mantine-Dropzone-root mantine-bx0zqe"
          data-testid="image-uploader"
          role="button"
          style="height: 100%;"
          tabindex="0"
        >
          <input
            accept="image/png,image/gif,image/jpeg,image/svg+xml,image/webp"
            autocomplete="off"
            style="display: none;"
            tabindex="-1"
            type="file"
          />
          <div
            class="mantine-Stack-root mantine-1eyjlke"
            style="pointer-events: none;"
          >
            <div
              class="mantine-Text-root mantine-1vhis6g"
            >
              ❌
               There has been an error.
            </div>
            <div
              class="mantine-Text-root mantine-4k0hyy"
            >
              Try again, make sure your image is in the correct format and does not exceed 3MB. Accepted formats are : .png, .gif, .jpeg, .svg and .webp
            </div>
          </div>
        </div>
      `)
    })
  })

  it('should match initial state snapshot', () => {
    expect(elements.dropzone).toMatchInlineSnapshot(`
      <div
        class="mantine-Dropzone-root mantine-bx0zqe"
        data-testid="image-uploader"
        role="button"
        style="height: 100%;"
        tabindex="0"
      >
        <input
          accept="image/png,image/gif,image/jpeg,image/svg+xml,image/webp"
          autocomplete="off"
          style="display: none;"
          tabindex="-1"
          type="file"
        />
        <div
          class="mantine-Stack-root mantine-1eyjlke"
          style="pointer-events: none;"
        >
          <div
            class="mantine-Text-root mantine-13bpxe2"
          >
            Drag image here or click to select file
          </div>
          <div
            class="mantine-Text-root mantine-4k0hyy"
          >
            Accepted formats are : .png, .gif, .jpeg, .svg and .webp. Maximum file size is 3MB.
          </div>
        </div>
      </div>
    `)
  })
})
