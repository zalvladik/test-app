import { calendarHours } from 'src/constans'

import styles from 'src/components/CalendarHourse/styles.module.scss'

const CalendarHourse = () => {
  return (
    <>
      {calendarHours.map(item => (
        <div className={styles.fragment} key={item.half_hourse}>
          <div>{item.hourse}</div>
          <div>{item.half_hourse}</div>
        </div>
      ))}
    </>
  )
}

export default CalendarHourse
