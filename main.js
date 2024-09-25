const app = Vue.createApp({
    data() {
        return {
            dateNow: new Date().toDateString(),
            taskList: [
                {
                   
                    name: "Jouer au golf",
                    isBeeingEdited: false,
                    editedName:'',
                    isDone: false,
                    position: 1
                },
                {
                   
                    name: "Faire à manger",
                    isBeeingEdited: false,
                    editedName: '',
                    isDone: false,
                    position: 2
                }
               
            ],
            newTaskName: '',
           
            
        }
    },
    methods: {
        saveTask(e = null) {
            if(e === null || (e !== null && e.key === 'Enter')){
                let position = this.taskList.length + 1
                let task = {
                   
                    name: this.newTaskName,
                    isBeeingEdited: false,
                    editedName:'',
                    isDone: false,
                    position: position
                }
                
                this.taskList.push(task)
                console.log(this.taskList)
                this.newTaskName = ''
            }
        },
        displayAllTasksDone(taskIndex){
            this.taskList[taskIndex].isDone = true
            this.taskList[taskIndex].position = (this.taskList.length +1) * (-1)
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