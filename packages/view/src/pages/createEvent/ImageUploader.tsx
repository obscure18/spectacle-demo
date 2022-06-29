import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useCallback, useState } from 'react'
import { uploadImage } from '../../api/uploadImage'
import { Progress, Stack, Text } from '@mantine/core'

export enum UploadState {
  NOT_STARTED = 'not-started',
  PENDING = 'pending',
  ERROR = 'error',
  UPLOADED = 'uploaded',
}

export type Props = {
  onUploaded: (imageUrl: string) => void
}
export const ImageUploader = ({ onUploaded }: Props) => {
  const [uploadState, setUploadState] = useState(UploadState.NOT_STARTED)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback(async (files: File[]) => {
    uploadImage(files[0]!, {
      onProgress: (progress: number) => {
        setUploadState(UploadState.PENDING)
        setProgress(progress)
      },
      onSuccess: (url: string) => {
        setUploadState(UploadState.UPLOADED)
        onUploaded(url)
      },
      onFailure: () => setUploadState(UploadState.ERROR),
    })
  }, [])

  return (
    <Dropzone
      data-testid="image-uploader"
      onDrop={onDrop}
      disabled={uploadState === UploadState.UPLOADED}
      onReject={() => setUploadState(UploadState.ERROR)}
      maxSize={3 * 1024 ** 2}
      multiple={false}
      accept={IMAGE_MIME_TYPE}
      style={{ height: '100%' }}
    >
      {() => (
        <Stack
          m={8}
          style={{
            pointerEvents: 'none',
          }}
        >
          {
            {
              [UploadState.PENDING]: (
                <>
                  <Text size="xl" inline>
                    Upload in progress
                  </Text>
                  <Progress value={progress} />
                </>
              ),
              [UploadState.ERROR]: (
                <>
                  <Text size="xl" color="red">
                    {`❌`} There has been an error.
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Try again, make sure your image is in the correct format and
                    does not exceed 3MB. Accepted formats are : .png, .gif,
                    .jpeg, .svg and .webp
                  </Text>
                </>
              ),
              [UploadState.NOT_STARTED]: (
                <>
                  <Text size="xl" inline>
                    Drag image here or click to select file
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Accepted formats are : .png, .gif, .jpeg, .svg and .webp.
                    Maximum file size is 3MB.
                  </Text>
                </>
              ),
              [UploadState.UPLOADED]: <Text size="xl">Uploaded! {`✅`}</Text>,
            }[uploadState]
          }
        </Stack>
      )}
    </Dropzone>
  )
}
