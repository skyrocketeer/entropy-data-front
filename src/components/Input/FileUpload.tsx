import { ReactNode, useRef } from 'react'
import { InputGroup } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

type FileUploadProps = {
  register: UseFormRegisterReturn
  accept?: string
  multiple?: boolean
  children?: ReactNode
  onPreviewImg: (img: {
    src: string | ArrayBuffer | null,
    title: string
  }) => void
}

const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children, onPreviewImg, ...rest } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref } = register as { ref: (instance: HTMLInputElement | null) => void }

  const handleClick = () => inputRef.current?.click()

  const previewFiles = (files: FileList | null) => {
    if (files && files.length) {

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        //Only pics
        if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
          const reader = new FileReader();

          reader.addEventListener("load", () => {
            // const image = new Image();
            // image.title = file.name;
            // image.src = reader.result as string;
            onPreviewImg({ src: reader.result, title: file.name });
          }, false);

          //Read the image
          reader.readAsDataURL(file);
        }
      }
    }
  }

  return (
    <InputGroup w={rest.w || '100%'} onClick={handleClick}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
        onChange={(e) => previewFiles(e.target.files)}
      />
      <>
        {children}
      </>
    </InputGroup>
  )
}

export default FileUpload