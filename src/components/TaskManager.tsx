import { Component, Watch, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';
import { useStore } from 'vuex-simple';
import { MyStore } from '@/store/store';

import dayjs, { formatDate } from '@/utils/dayjs';

import { Task } from '@/types/Task';

import Calendar from './Calendar';
import TaskList from './TaskList';

import styles from './TaskManager.css?module';

@Component
export default class TaskManager extends VueComponent {
  public store: MyStore = useStore(this.$store);

  private get taskList() {
    return this.store.tasks;
  }
  private get taskListBySelectDay() {
    return this.store.tasks.filter(
      (task: Task) => task.date === this.selectedDay,
    );
  }

  private get dayWithTask(): string[] {
    const days: string[] = [];
    this.store.tasks.map((task: Task) => {
      if (days.some((day: string) => task.date === day)) {
        return;
      }
      days.push(task.date);
    });
    return days;
  }

  private selectedDay: string = dayjs().format(formatDate);

  private AddNewTask(newTask: string) {
    const task: Task = {
      id: this.taskList.length,
      date: this.selectedDay,
      name: newTask,
      completed: false,
    };
    this.store.addTask(task);
  }
  private updateTask(status: boolean, id: number) {
    this.store.updateStatusTask({ status, id });
  }

  render() {
    return (
      <div class={styles.layout}>
        <Calendar
          vModel={this.selectedDay}
          dayWithTask={this.dayWithTask}
        ></Calendar>
        <TaskList
          taskList={this.taskListBySelectDay}
          onAdd={this.AddNewTask}
          onUpdate={(status: boolean, id: number) =>
            this.updateTask(status, id)
          }
        ></TaskList>
      </div>
    );
  }
}
