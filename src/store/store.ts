import { State, Mutation, Action } from 'vuex-simple';

import { Task, payloadStatus } from '@/types/Task';

export class MyStore {
  @State()
  public tasks: Task[] = [];

  @Mutation()
  public ADD_TASK(task: Task) {
    this.tasks.push(task);
  }

  @Action()
  public addTask(task: Task) {
    this.ADD_TASK(task);
  }

  @Mutation()
  public UPDATE_STATUS_TASK(playload: payloadStatus) {
    const findIndex = this.tasks.findIndex(
      (task: Task) => task.id === playload.id,
    );
    this.tasks[findIndex].completed = playload.status;
  }

  @Action()
  public updateStatusTask(playload: payloadStatus) {
    this.UPDATE_STATUS_TASK(playload);
  }
}
