const app = Vue.createApp({
    data() {
        return {
            dateNow: new Date().toDateString(),
            taskList: [
                {
                   
                    name: "Jouer au golf",
                    isBeeingEdited: false,
                    editedName:''
                },
                {
                   
                    name: "Faire à manger",
                    isBeeingEdited: false,
                    editedName: ''
                }
               
            ],
            newTaskName: '',
            taskListDone : [],
            isEditing: false
        }
    },
    methods: {
        saveTask(e = null) {
            if(e === null || (e !== null && e.key === 'Enter')){
               
                
                let task = {
                   
                    name: this.newTaskName,
                    isBeeingEdited: false,
                    editedName:''
                }
                
                this.taskList.push(task)
                console.log(this.taskList)
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
        editTask(editInformation){
            console.log(editInformation)
            this.taskList[editInformation.index].name = editInformation.name
            this.taskList[editInformation.index].isBeeingEdited = false
        },
        deleteTask(taskIndex){
            this.taskList = this.taskList.filter((_,i) => i !== taskIndex)
        }
    }
})