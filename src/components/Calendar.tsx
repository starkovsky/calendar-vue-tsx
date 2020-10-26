import { Component, Prop, PropSync, Model, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import dayjs, { formatDate } from '@/utils/dayjs';

import styles from './Calendar.css?module';

interface Props {
  vModel: string;
  dayWithTask: string[];
}

@Component
export default class Calendar extends VueComponent<Props> {
  private weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  private get month() {
    return Number(dayjs().format('M'));
  }

  private get year() {
    return Number(dayjs().format('YYYY'));
  }

  private get numberOfDaysInMonth(): number {
    return dayjs().daysInMonth();
  }

  private get currentMonthDays() {
    const days: string[] = [];
    for (let day = 1; day < this.numberOfDaysInMonth; day++) {
      days.push(`${day}-${this.month}-${this.year}`);
    }
    const firstWeekday = dayjs(days[0]).weekday();
    const emptyDays = [];
    for (let empty = 1; empty < firstWeekday; empty++) {
      emptyDays.push('0');
    }
    return [...emptyDays, ...days];
  }

  private get days() {
    return this.currentMonthDays.map((day) => this.dayNode(day));
  }

  private foramttedDay(day: string) {
    return dayjs(day, formatDate, true).format('D');
  }

  private dayNode(day: string) {
    const withTask = this.dayWithTask.some((taskedDay) => taskedDay === day);
    if (day === '0') {
      return (<div class={styles.days}></div>);
    }
    return (
      <div
        class={[
          styles.days,
          day === this.selectedDay ? styles.selected : null,
          withTask ? styles.withTask : null,
        ]}
        onClick={() => this.onClick(day)}
      >
        {this.foramttedDay(day)}
      </div>
    );
  }

  @Prop() private readonly dayWithTask!: string[];

  @Model('change', { type: String }) readonly selectedDay!: string;

  private onClick(day: string) {
    console.log(day);
    this.$emit('change', day);
  }

  render() {
    return (
      <div class={styles.wraper}>
        <div class={styles.calendar}>
          <div class={styles.month}>Октябрь, 2020</div>
          <div class={styles.calendarGrid}>
            {this.weeks.map((week) => (
              <div class={styles.daysOfWeek}>{week}</div>
            ))}
            {this.days}
          </div>
        </div>
      </div>
    );
  }
}
