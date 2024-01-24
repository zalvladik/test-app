import type { EventResponseT } from 'src/types'

import { useDispatch } from 'react-redux'

import { useAppSelector, type AppDispatch } from 'src/redux/store'

export const useCalendarPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data } = useAppSelector(state => state.eventReducer)
  const { calendarId } = useAppSelector(state => state.authReducer)

  const eventPositionsFunc = (data: EventResponseT[]): EventResponseT[] => {
    const params = data
      .map(item => ({ ...item, crosses: [] as string[], spacing: 0 }))
      .sort((a, b) => a.start - b.start)

    for (let i = 0; i < params.length - 1; i++) {
      for (let b = i + 1; b < params.length; b++) {
        const range1 = [params[i].start, params[i].start + params[i].duration]
        const range2 = [params[b].start, params[b].start + params[b].duration]

        if (range1[0] < range2[1] && range1[1] > range2[0]) {
          params[i].crosses = [...params[i].crosses, params[b]._id]
          params[b].crosses = [...params[b].crosses, params[i]._id]
        }
      }
    }

    params.map(item => ({
      ...item,
      crosses: Array.from(new Set(item.crosses)),
    }))

    for (let a = 0; a < params.length; a++) {
      if (params[a].crosses.length < 2) {
        continue
      }

      for (let b = 0; b < params[a].crosses.length; b++) {
        params.map(item => {
          if (item._id !== params[a].crosses[b]) {
            return item
          }

          for (let c = 0; c < params[a].crosses.length; c++) {
            const isHas = item.crosses.includes(params[a].crosses[b + 1])

            if (!isHas) {
              params[a].crosses = params[a].crosses.filter(
                id => id !== params[a].crosses[b + 1],
              )
            }
          }

          return item
        })
      }
    }

    const result = [...params]

    params.map((item, i) => {
      for (let i = 0; i < params.length; i++) {
        if (item._id === params[i]._id) {
          continue
        }

        const range1 = [params[i].start, params[i].start + params[i].duration]
        const range2 = [item.start, item.start + item.duration]

        if (range1[0] < range2[1] && range1[1] > range2[0]) {
          result[i].spacing++
        }

        if (result[i - 1] && result[i - 1].spacing > result[i].spacing) {
          result[i].spacing--
        }
      }

      params[i] = {
        _id: '',
        spacing: -1,
        start: -1,
        duration: -1,
        title: '',
        crosses: [],
      }

      return null
    })

    return result
  }

  return {
    eventPosition: eventPositionsFunc(data),
    calendarId,
    dispatch,
  }
}
