import { Component, Prop, Emit } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './TaskList.css?module';

import { Task } from '@/types/Task';

interface Props {
  taskList: Task[];
  onAdd: (newTask: string) => void;
  onUpdate: (status: boolean, id: number) => void;
}

@Component
export default class TaskList extends VueComponent<Props> {
  @Prop()
  private taskList!: Task[];

  private onChangeTaskStatus(event: Event, id: number) {
    const status = (event.target as HTMLInputElement).checked;
    this.update(status, id);
  }

  @Emit()
  update(status: boolean, id: number) {
    return;
  }

  private get taskListNodes() {
    return this.taskList.map((task: Task) => (
      <div class={styles.task} key={task.id}>
        <input
          type="checkbox"
          id={task.id}
          class={styles.taskCheckbox}
          checked={task.completed}
          onChange={(event: Event) => this.onChangeTaskStatus(event, task.id)}
        ></input>
        <label for={task.id} class={styles.taskName}>
          {task.name}
        </label>
      </div>
    ));
  }

  private newTask: string = '';

  private onEnter(event: KeyboardEvent) {
    if (event.key !== 'Enter' || this.newTask === '') {
      return;
    }
    this.add(this.newTask);
  }

  @Emit()
  add(newTask: string) {
    this.newTask = '';
  }

  render() {
    return (
      <div class={styles.wraper}>
        <div class={styles.taskListName}>События</div>
        {this.taskListNodes}
        <input
          type="text"
          vModel={this.newTask}
          class={styles.input}
          onKeyup={(event: KeyboardEvent) => this.onEnter(event)}
        ></input>
      </div>
    );
  }
}
