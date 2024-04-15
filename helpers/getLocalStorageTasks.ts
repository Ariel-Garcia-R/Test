export const getLocalStorageTasks = () => {
   const localStorageContent =  localStorage.getItem('tasks')
   if (localStorageContent) return JSON.parse(localStorageContent)    
   return []
}