<script setup lang="ts">
import type { TaskInterface } from "~/types/taskInterface";
import { useTaskStore } from "@/store/store";
import { storeToRefs } from 'pinia';
import { useI18n } from '#imports'

const { t } = useI18n()
const snackbar = useSnackbar();
const taskStore = useTaskStore();
const { addTask, setIsCreatingNewTask, setIsEditingExistingTask, updateTask, setEditingTask } = taskStore;
const { isEditingExistingTask, getEditingTask } = storeToRefs(taskStore);

const maxChars = 280
const defaultTaskItem: TaskInterface = {
  id: '',
  body: '',
  formattedBody: '',
  isCompleted: false
};
const textarea = ref<HTMLTextAreaElement>()
const isTaskBoxOpen = ref(false);
const taskItem = ref<TaskInterface>({ ...defaultTaskItem });
const creatingNewTask = computed(() => taskItem.value.body != '' && isTaskBoxOpen.value && !taskItem.value.id);
const isEmptyTask = computed(() => taskItem.value.body === '');

const toggleTaskBox = (): void => {
  isTaskBoxOpen.value = !isTaskBoxOpen.value;
};

watch(creatingNewTask, (): void => {
  setIsCreatingNewTask(creatingNewTask.value);
});

watch(isEditingExistingTask, (): void => {
  if (isEmptyTask.value) {
    taskItem.value = getEditingTask.value;
    isTaskBoxOpen.value = true
  }
});

const clearTaskEditor = (): void => {
  taskItem.value = { ...defaultTaskItem };
};

const saveTaskToStore = (): void => {
  if (isEmptyTask.value) {
    toggleTaskBox();
  } else if (taskItem.value.id) {
    updateTask({ ...taskItem.value });
    setIsEditingExistingTask(false);
    clearTaskEditor();
  } else {
    addTask(taskItem.value);
    setIsCreatingNewTask(false);
    clearTaskEditor();
  }
};

const cancel = (): void => {
  setIsCreatingNewTask(false);
  setIsEditingExistingTask(false);
  isTaskBoxOpen.value = false
  setEditingTask({ ...defaultTaskItem });
  taskItem.value = { ...defaultTaskItem }
}

const handleTextInput = (event: Event): void => {
  const textarea = event.target as HTMLTextAreaElement
  if (textarea.value.length <= maxChars) {
    taskItem.value.body = textarea.value
  } else {
    taskItem.value.body = textarea.value = textarea.value.substring(0, maxChars)
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(taskItem.value.body);
    snackbar.add({
      title: 'Copied ✍️',
      text: t('copiedSuccess')
    })
  } catch (err) {
    console.error('Error al copiar al portapapeles: ', err);
  }
}

const addCharacter = (character: string) => {
  if (textarea.value) {
    const start = textarea.value.selectionStart;
    const end = textarea.value.selectionEnd;
    const textBefore = textarea.value.value.substring(0, start);
    const textAfter = textarea.value.value.substring(end, textarea.value.value.length);
    taskItem.value.body = textBefore + character + textAfter;
    const newPosition = start + 1;
    textarea.value.focus();
    setTimeout(() => {
      if (textarea.value) {
        textarea.value.setSelectionRange(newPosition, newPosition);
      }
    }, 1);}
}

</script>

<template>
  <h1>Usando localStorage</h1>
  <button
    v-if="!isTaskBoxOpen"
    class="text-[#8A94A6] flex gap-4 items-center my-5"
    @click="toggleTaskBox"
  >
    <PlusSquareIcon class="text-[#007FFF]" />
    <span>{{ $t('taskPlaceholder') }}</span>
  </button>
  <div
    v-else
    class="flex-col w-full rounded-t border border-[#F1F3F4] dark:border-gray-800 my-5"
  >
    <div class="h-24 xl:h-16 w-full max-w-[1360px] flex">
      <div class="mx-3 my-2">
        <PlusSquareIcon
          size="20"
          class="text-[#007FFF]"
        />
      </div>
      <textarea
        id="task-editor"
        ref="textarea"
        :value="taskItem.body"
        name="task-editor"
        class="resize-none w-full dark:bg-gray-900 dark:text-gray-500 pt-[5px] overflow-y-auto outline-none caret-blue-500"
        :placeholder="$t('taskPlaceholder')"
        @keyup="handleTextInput"
      />
      <div
        class="w-24 relative"
        :class="{ 'opacity-50': isEmptyTask }"
      >
        <img
          class="h-6 w-6 rounded-full bg-cover absolute top-2 right-2"
          src="/avatar.png"
          alt="avatar"
        >
        <span class="text-[.8rem] absolute bottom-2 right-2">{{ taskItem.body.length }}/{{ maxChars }}</span>
      </div>
    </div>
    <div class="flex justify-between bg-[#FAFBFB] dark:bg-slate-800 h-14 items-center px-2">
      <div class="flex gap-[5px] xl:gap-1">
        <SharedIconButton
          :disabled="isEmptyTask"
          class="bg-[#EAF0F5] disabled:text-opacity-55 text-black border-none dark:bg-slate-700 dark:text-slate-400 dark:disabled:text-slate-500"
          icon-class="disabled:text-[#4E5D78] text-[#04142F] dark:disabled:text-slate-600 dark:text-slate-500"
        >
          <template #icon>
            <Maximize2Icon size="20" />
          </template>{{ $t('openButton') }}
        </SharedIconButton>
        <SharedIconButton :disabled="isEmptyTask">
          <template #icon>
            <CalendarIcon size="20" />
          </template>{{ $t('todayButton') }}
        </SharedIconButton>
        <SharedIconButton
          :disabled="isEmptyTask"
          @click="copyToClipboard"
        >
          <template #icon>
            <ClipboardIcon size="20" />
          </template>{{ $t('publicButton') }}
        </SharedIconButton>
        <SharedIconButton @click="addCharacter('#')">
          <template #icon>
            <HashIcon size="20" />
          </template>{{ $t('highlightButton') }}
        </SharedIconButton>
        <SharedIconButton @click="addCharacter('@')">
          <template #icon>
            <AtSignIcon size="20" />
          </template>{{ $t('estimationButton') }}
        </SharedIconButton>
      </div>
      <div class="flex gap-1">
        <SharedButton
          class="hidden xl:block bg-[#EAF0F5] text-slate-800 dark:bg-slate-700 dark:text-slate-300"
          @click="cancel()"
        >
          {{ $t('cancelButton') }}
        </SharedButton>
        <SharedButton
          class="hidden xl:block"
          @click="saveTaskToStore"
        >
          {{ isEmptyTask ?
            $t('confirmButtonEmpty') :
            (isEditingExistingTask ? $t('confirmSaveButton') : $t('confirmButton')) }}
        </SharedButton>
        <SharedButton
          class="xl:hidden"
          @click="saveTaskToStore"
        >
          <XIcon
            v-if="isEmptyTask"
            size="20"
          />
          <SaveIcon
            v-else-if="taskItem.id"
            size="20"
          />
          <PlusIcon
            v-else
            size="20"
          />
        </SharedButton>
      </div>
    </div>
  </div>
</template>