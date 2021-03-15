<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="createTask">
        <div class="field">
          <label class="label">Task Title</label>
          <div class="control">
            <input
                v-model="title"
                class="input"
                type="text"
                placeholder="Enter task"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea
                v-model="description"
                class="textarea"
                placeholder="Textarea"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Assigned By</label>
          <div class="control">
            <input
                v-model="createdBy"
                class="input"
                type="text"
                placeholder="Enter Assigner's name"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Assigned To</label>
          <div class="control">
<!--            <input-->
<!--                v-model="assignedTo"-->
<!--                class="input"-->
<!--                type="text"-->
<!--                placeholder="Enter task creator's name"-->
<!--            />-->
            <select v-model="assignedTo" >
              <option value="" v-for="(member, index) in membersList" :key="index">{{ member }}</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">DeliveryDate</label>
          <div class="control">
            <input
                v-model="deliveryDate"
                class="input"
                type="datetime-local"
                placeholder="Enter Date"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Tags</label>
          <div class="control">
            <select v-model="tags" >
              <option :value="tag" v-for="(tag, index) in tagsList" :key="index">{{ tag }}</option>
            </select>
<!--            <input-->
<!--                v-model="tags"-->
<!--                class="input"-->
<!--                type="text"-->
<!--                placeholder="Enter Date"-->
<!--            />-->
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control" @click="closeModal">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
    <button
        class="modal-close is-large"
        @click="closeModal"
        aria-label="close"
    ></button>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive, toRefs} from 'vue'
import { useStore } from '@/store'
import { TaskItem } from '@/store/state'
import { MutationType, TagsTypes, MembersTypes } from '@/store/mutations'
export default {
  name: 'CreateModal',
  setup() {
    console.log(TagsTypes)
    const tagsList = computed(() => TagsTypes)
    const membersList = computed(() => MembersTypes)
    const customState = reactive({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      deliveryDate: '',
      tags: '',
      closeToDeliveryDate: ''
    })
    const store = useStore()
    const createTask = () => {
      if (
          customState.title === '' ||
          customState.description === '' ||
          customState.createdBy === '' ||
          customState.assignedTo === '' ||
          customState.deliveryDate === '' ||
          customState.tags === '' ||
          customState.closeToDeliveryDate === ''
      )
        return
      const task: TaskItem = {
        id: Date.now(),
        title: customState.title,
        description: customState.description,
        createdBy: customState.createdBy,
        assignedTo: customState.assignedTo,
        deliveryDate: new Date(customState.deliveryDate),
        tags: customState.tags,
        completed: false,
        editing: false,
        closeToDeliveryDate: false,
      }
      store.commit(MutationType.CreateTask, task)
      customState.title = ''
      customState.createdBy = ''
      customState.assignedTo = ''
      customState.description = ''
      customState.deliveryDate = ''
      customState.tags = ''
      customState.closeToDeliveryDate = ''

    }
    const closeModal = () => {
      store.commit(MutationType.SetCreateModal, false)
    }
    return { closeModal, ...toRefs(customState), createTask, tagsList, membersList }
  }
}
</script>
