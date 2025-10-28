'use client'

import { useEffect, useMemo, useRef } from 'react'
import type Quill from 'quill'
import 'quill/dist/quill.snow.css'

const toolbarOptions = [
  [{ font: [] }, { size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'link'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ header: 1 }, { header: 2 }, 'blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
  ['image', 'video'],
  ['clean']
]

const formats = [
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'link',
  'color',
  'background',
  'script',
  'header',
  'blockquote',
  'code-block',
  'list',
  'indent',
  'align',
  'image',
  'video'
]

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function QuillEditor({ value, onChange, placeholder, className }: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)
  const onChangeRef = useRef(onChange)

  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions
    }),
    []
  )

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    let isMounted = true
    let quillInstance: Quill | null = null
    let changeHandler: (() => void) | undefined

    async function initQuill() {
      const QuillModule = await import('quill')
      if (!isMounted || !containerRef.current) return

      const editorElement = document.createElement('div')
      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(editorElement)

      quillInstance = new QuillModule.default(editorElement, {
        theme: 'snow',
        placeholder,
        modules,
        formats
      })

      quillRef.current = quillInstance

      changeHandler = () => {
        if (quillInstance) {
          onChangeRef.current(quillInstance.root.innerHTML)
        }
      }

      quillInstance.on('text-change', changeHandler)
    }

    initQuill()

    return () => {
      isMounted = false
      if (quillInstance) {
        quillInstance.off('text-change', changeHandler)
      }
      quillRef.current = null
    }
  }, [modules, placeholder])

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || ''
    }
  }, [value])

  return <div ref={containerRef} className={className} />
}
