'use client'

import { Controller } from 'react-hook-form'

import type { CreateEventFormProps } from 'src/components/CreateEventForm/types'

import DownloadIcon from 'src/components/Icons/DownloadIcon'
import { useCreateEventForm } from 'src/components/CreateEventForm/useCreateEventForm'

import styles from 'src/components/CreateEventForm/styles.module.scss'

const CreateEventForm = ({ calendarId }: CreateEventFormProps): JSX.Element => {
  const { control, isLoading, handleSubmit, handleDownload, errors } =
    useCreateEventForm(calendarId)

  return (
    <form className={styles.form_container}>
      <Controller
        control={control}
        name="start"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.input_container}>
            <input
              placeholder="Start"
              type="text"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.start && <p>{errors.start.message}</p>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="end"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.input_container}>
            <input
              placeholder="End"
              type="text"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.end && <p>{errors.end.message}</p>}
          </div>
        )}
      />
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <div className={styles.input_container}>
            <input
              placeholder="Title"
              type="text"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
        )}
      />
      <button disabled={isLoading} type="submit" onClick={handleSubmit}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>

      <div className={styles.download_icon} onClick={() => handleDownload()}>
        <DownloadIcon />
      </div>
    </form>
  )
}

export default CreateEventForm
