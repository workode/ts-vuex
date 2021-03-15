<template>
  <th>{{ id }}</th>
  <td>
    <input type="checkbox" :checked="completed" @change="toggleCompletion()" />
  </td>
  <td>{{ title }} <strong>(C)</strong></td>
  <td>{{ createdBy }}</td>
  <td>{{ assignedTo }}</td>
  <td>{{  formatedDate }}</td>
  <td class="tags" :class="tags"><span>{{ tags }}</span>  <b v-if="closeToDeliveryDate">🕒</b></td>
  <td>
    <button @click="viewTask()">View</button>
    <button @click="editTask()">Edit</button>
    <button @click="removeTask()">Remove</button>
  </td>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { MutationType, TagsTypes } from '@/store/mutations'
export default defineComponent({
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    assignedTo: { type: String, required: true },
    completed: { type: Boolean, required: true },
    deliveryDate: { type: String, required: true },
    tags: {type: String, required: true},
    closeToDeliveryDate: {type: Boolean, required: true}
  },
  setup(props) {
    const store = useStore()

    const toggleCompletion = () => {
      store.commit(MutationType.CompleteTask, {
        id: props.id,
        completed: !props.completed
      })
    }
    const newDate = new Date(props.deliveryDate);

    const formatedDate = computed(() =>
        newDate.toDateString() + ' at ' +
        (newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours()) + ':' +
        (newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes())
    )

    const removeTask = () => {
      store.commit(MutationType.RemoveTask, {
        id: props.id
      })
    }
    const viewTask = () => {
      store.commit(MutationType.SetTaskModal, {showModal:true, taskId:props.id})
    }
    const editTask = () => {
      store.commit(MutationType.SetEditModal, {showModal:true, taskId: props.id})
    }
    return { toggleCompletion, removeTask, editTask, viewTask, formatedDate }
  }
})
</script>

<style>
.tags span{
  color:#fff; padding:3px; border-radius:10px; display: inline-block;
  margin:0;
  font-size:13px;
  padding:0;border:none;
  padding: 3px 10px;
  margin: 0;
  border: none;
  vertical-align: middle;
  text-align: center;
}
.priority span{
  background-color:red
}
.revision span{
  background-color:blueviolet;
}
.bug span{
  background-color:darkolivegreen;
}
</style>
