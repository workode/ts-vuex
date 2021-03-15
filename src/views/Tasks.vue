
<template>
  <div class="container mx-auto mt-4">


<div v-if="loading">
  <h3 class="has-text-centered mt-4">Loading...</h3>
</div>
<div v-else>

  <TaskList/>
  <br><br>
  <p class="mt-2">
    {{ completedCount }} of {{ totalCount }} completed.
    <progress :value="completedCount" :max="totalCount">30%</progress>
  </p>
<br><br><br>
  <div>
    <h4><b>Tasks close to the delivery date</b></h4>
    <ul>
      <li>
        <h5><b>2 days to delivery date</b></h5>
        <ul>
          <li>&bull; Task 1</li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import TaskList from '../components/TaskList.vue'
import { useStore } from '@/store'
import { ActionTypes } from '@/store/actions'
import {MutationType} from "@/store/mutations";
export default defineComponent({
  components: { TaskList },
  setup() {
    const store = useStore()
    const loading = computed(() => store.state.loading)

    const tasksCloseToDeliveryDate = () => {
  console.log("RUN")
      const storeDates = store.state.tasks;
  console.log(store.state.tasks)
      storeDates.forEach(function(val) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = val.deliveryDate;
        const secondDate = Date.now();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        if (diffDays <= 3) {
          console.log("SIM")
          store.commit(MutationType.AutoPriorityTag, {
            id: val.id,
            closeToDeliveryDate: true
          })
        }
      })

    }



    onMounted(() => {
      store.dispatch(ActionTypes.GetTaskItems)

      setTimeout(() => tasksCloseToDeliveryDate(), 3000)

    })
    const completedCount = computed(() => store.getters.completedTaskCount)
    const totalCount = computed(() => store.getters.totalTaskCount)
    return { loading, completedCount, totalCount, tasksCloseToDeliveryDate }
  }
})
</script>
<style>
@import '~bulma/css/bulma.css';

.modal-content label{
  color:#fff;
}
</style>
