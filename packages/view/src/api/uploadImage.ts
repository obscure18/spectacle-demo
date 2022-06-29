import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  UploadTask,
} from 'firebase/storage'

export const uploadImage = async (
  file: File,
  {
    onProgress,
    onSuccess,
    onFailure,
  }: {
    onProgress: (progressPercentage: number) => void
    onSuccess: (url: string) => void
    onFailure: (error?: string | Error) => void
  }
) => {
  const storage = getStorage()
  const storageRef = ref(storage, 'events/' + file.name)
  const uploadTask: UploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    'state_changed',
    (snapshot: UploadTaskSnapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      onProgress(progress)
    },
    (error) => {
      console.log('Image upload error: ', error.message)
      console.log(error.cause)
      onFailure(error.cause ?? error.message)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onSuccess(downloadURL)
      })
    }
  )
}
