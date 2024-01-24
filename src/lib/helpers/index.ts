import type { HourseParserT, EventResponseT } from 'src/types'

export const hourseParser = (params: HourseParserT) => {
  const splitedStart = params.start.split(':')
  const splitedEnd = params.end.split(':')

  const start = +splitedStart[0] * 60 + +splitedStart[1] - 480
  const end = +splitedEnd[0] * 60 + +splitedEnd[1] - 480
  const duration = end - start

  return {
    start,
    end,
    duration,
    title: params.title,
  }
}

export const didCanAdd = (
  start: number,
  duration: number,
  data: EventResponseT[],
): boolean => {
  const params = data
    .map(item => ({ ...item, crosses: [] as string[], spacing: 0 }))
    .concat({
      start,
      duration,
      title: 'didCanAdd',
      _id: 'didCanAdd',
      crosses: [],
      spacing: 0,
    })
    .sort((a, b) => a.start - b.start)

  if (data.length < 4) {
    return true
  }

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

  const didCanAddItem = params.find(item => item._id === 'didCanAdd')
  const result = didCanAddItem!.crosses.length > 3

  return !result
}
