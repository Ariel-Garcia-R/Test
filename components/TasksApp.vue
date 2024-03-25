<script setup>
const editableTask = reactive({})
const insertTaskOnEditor = (task) => {
    editableTask.value = task
}

</script>

<template>
     <NewTask :editableTask="editableTask" />
     <TasksList @task-to-edit="(task) => insertTaskOnEditor(task)" />
</template>