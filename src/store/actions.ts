// /store/action.ts
import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType, TagsTypes } from './mutations'
import { State } from './state'

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
}

export enum ActionTypes {
  GetTaskItems = 'GET_Task_ITEMS',
  SetCreateModal = 'SET_CREATE_MODAL',
  SetEditModal = 'SET_EDIT_MODAL'
}

export type Actions = {
  [ActionTypes.GetTaskItems](context: ActionAugments): void;
  [ActionTypes.SetCreateModal](context: ActionAugments): void;
  [ActionTypes.SetEditModal](context: ActionAugments): void;
}

//action.ts
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTaskItems]({ commit }) {
    commit(MutationType.SetLoading, true)
    await sleep(400)
    commit(MutationType.SetLoading, false)
    commit(MutationType.SetTasks, [
      {
        id: 1436,
        title: 'Create a new programming language',
        description: "The programing language should have full typescript support ",
        createdBy: "Emmanuel John",
        assignedTo: "Saviour Peter",
        completed: false,
        editing: false,
        deliveryDate: Date.now(),
        tags: TagsTypes.PRIORITY,
        closeToDeliveryDate: false
      },
      {
        id: 452,
        title: 'Create a new programming language',
        description: "The programing language should have full typescript support ",
        createdBy: "Emmanuel John",
        assignedTo: "Saviour Peter",
        completed: false,
        editing: false,
        deliveryDate: Date.now()+409400440,
        tags: TagsTypes.BUG,
        closeToDeliveryDate: false
      },
      {
        id: 323,
        title: 'Create a new programming language',
        description: "The programing language should have full typescript support ",
        createdBy: "Emmanuel John",
        assignedTo: "Saviour Peter",
        completed: false,
        editing: false,
        deliveryDate: Date.now()+209400440,
        tags: TagsTypes.REVISION,
        closeToDeliveryDate: false
      }
    ])
  },
  async [ActionTypes.SetCreateModal]({ commit }) {
    commit(MutationType.SetCreateModal, true)
  },
  async [ActionTypes.SetEditModal]({ commit }) {
    commit(MutationType.SetEditModal, {showModal: true, taskId: 1})
  }
}
