app.component('task-listing',{
    props: {
        taskList : {
            type: Array,
            required: true
        },
       
    },
    template :
    /*html*/
    `
        <div class="task-list w-11/12 bg-[#eee]">
            <div class="p-2 task-list-item flex justify-between bg-white rounded-xl m-5"
                v-for="(task,index) in taskList"
                :key="index"
            >
                <p v-if='!task.isBeeingEdited'class="px-1"> {{ task.name }}</p>
                <div v-if='!task.isBeeingEdited' class="task-item-option">
                    <i class="px-2 fa-solid fa-check text-green-600" @click="markTaskAsDone(index)"></i>
                    <i class="fa-solid fa-pencil text-yellow-500" @click="displayInputEditionTask(index)"></i>
                    <i class="px-2 fa-solid fa-x text-red-600" 
                    @click="deleteTask(index)"></i>
                </div>
                <input type="text" 
                    v-model='task.editedName'
                    @keydown="editTask($event,index)"
                    v-if='task.isBeeingEdited'
                    class='outline-none border-none'
                    :id="'edit-input-' + index"
                    :ref="'edit-input-' + index"
                />
            </div>
            
        </div>
    `,
    data(){
        return {
            editedTaskName : '',
            isEditing : false
        }
    },
    methods: {
       
        markTaskAsDone(taskIndex){
            
            this.$emit('marked-as-done', taskIndex)
        },
        displayInputEditionTask(taskIndex){
            this.taskList[taskIndex].isBeeingEdited = true
            this.taskList[taskIndex].editedName = this.taskList[taskIndex].name
            this.$nextTick(() => {
                const inputElement = this.$refs['edit-input-' + taskIndex][0]; // Récupère l'input par référence
                inputElement.focus(); // Met le focus sur l'input
                inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length); // Place le curseur à la fin
              });
            
        },
        editTask(event,taskIndex){
            
            if(event.key === 'Enter'){
                let editionInformation = {
                    index: taskIndex,
                    name: this.taskList[taskIndex].editedName
                }
                this.$emit('task-edited',editionInformation) 
            }
                 
            
        },
        deleteTask(taskIndex){
            this.$emit('task-deleted', taskIndex)
        },
        identifierName(taskIndex){
            return 'edit-input-' + taskIndex
        }
    },
  
})