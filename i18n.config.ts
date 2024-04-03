export default defineI18nConfig(() => ({
  legacy: true,
  locale: 'en',
  messages: {
    en: {
      appTittle: 'Tasks App',
      welcome: 'Welcome',
      taskPlaceholder: 'Type to add new task',
      openButton: 'Open',
      todayButton: 'Today',
      publicButton: 'Copy',
      highlightButton: 'Tag',
      estimationButton: 'Mention',
      confirmButtonEmpty: 'Ok',
      confirmSaveButton: 'Save',
      confirmButton: 'Add',
      cancelButton: 'Cancel',
      copiedSuccess: 'Copied to clipboard'
    },
    sp: {
      appTittle: 'App de Tareas',
      welcome: 'Bienvenido',
      taskPlaceholder: 'Escribe una nueva tarea',
      openButton: 'Abrir',
      todayButton: 'Hoy',
      publicButton: 'Copiar',
      highlightButton: 'Etiquetar',
      estimationButton: 'Mencionar',
      confirmButtonEmpty: 'OK',
      confirmButton: 'Agregar',
      confirmSaveButton: 'Guardar',
      cancelButton: 'Cancelar',
      copiedSuccess: 'Copiado al cortapapeles'


    }
  }
}))
