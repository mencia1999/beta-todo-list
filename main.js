const app = Vue.createApp({
    data() {
        return {
            dateNow: new Date().toDateString(),
            taskList: ['Jouer au Golf'],
            newTaskName: '',
            taskListDone : []
        }
    },
    methods: {
        saveTask(e) {
            if(e.key === 'Enter'){
                this.taskList.push(this.newTaskName)
                this.newTaskName = ''
            }
        },
        displayAllTasksDone(taskIndex){
            console.log(taskIndex)
            const taskToMarkAsDone = this.taskList[taskIndex]
            this.taskList = this.taskList.filter((_,i) => i !== taskIndex)
            this.taskListDone.push(taskToMarkAsDone)
            confetti()
            
        },
        deleteTask(taskIndex){
            this.taskList = this.taskList.filter((_,i) => i !== taskIndex)
        }
    }
})