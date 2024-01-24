import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import type { HourseParserT } from 'src/types'
import type { AppDispatch } from 'src/redux/store'

import { useDispatch } from 'react-redux'
import { useAppSelector } from 'src/redux/store'

import { postEvent } from 'src/redux/services/event-operations'

import { didCanAdd, hourseParser } from 'src/lib/helpers'
import { badToast } from 'src/lib/toastify'
import { schema } from 'src/components/CreateEventForm/validationSchema'

export const useCreateEventForm = (calendarId: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, data: hourseParams } = useAppSelector(
    state => state.eventReducer,
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HourseParserT>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { start: '8:00', end: '9:20', title: 'test' },
  })

  const onSubmit = (data: HourseParserT) => {
    const { start, end, duration, title } = hourseParser(data)
    const didCan = didCanAdd(start, duration, hourseParams)

    /* eslint-disable newline-before-return */
    if (!duration) {
      badToast("You can't start and finish at the same time")
      return
    }

    if (!didCan) {
      badToast('max events: 4')
      return
    }

    if (start > end) {
      badToast('The start must be less than the end')
      return
    }

    if (start > 540 || end > 540 || start < 0 || end < 0) {
      badToast('The time must be selected from 8:00 to 17:00')
      return
    }

    dispatch(postEvent({ start, duration, title, calendarId }))
  }

  const handleDownload = () => {
    if (!hourseParams.length) {
      badToast('To download, add at least 1 event')

      return
    }

    const jsonData = JSON.stringify(
      hourseParams.map(item => ({ ...item, _id: undefined })),
      null,
      2,
    )
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    errors,
    control,
    isLoading,
    handleDownload,
    handleSubmit: handleSubmit(onSubmit),
  }
}
