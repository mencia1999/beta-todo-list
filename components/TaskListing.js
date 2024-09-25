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
        <div class="task-list w-11/12 ">
            <div class="p-2 task-list-item flex justify-between bg-white rounded-xl m-5 shadow"
                :class="{
                'bg-[#FCFFE0]': task.isDone,
                'text-black': task.isDone
                }"
                v-for="(task,index) in taskList.sort((a, b) => b.position - a.position)"
                :data-position="index"
                :key="index">
                <div class="task-item flex items-center p-2" v-if='!task.isBeeingEdited'>
                    <input type="checkbox" v-model="task.isChecked" class="w-4 h-4 text-[#75A47F]  rounded " @click="markTaskAsDone(index)" v-if="!task.isDone && !task.isBeeingEdited"/>
                    <p 
                        v-if='!task.isBeeingEdited'
                        class="px-3"
                        :class="{'line-through': task.isDone}"> 
                        {{ task.name }}
                    </p>
                </div>
               
                <div v-if='!task.isBeeingEdited && !task.isDone' class="task-item-option">
                   
                    <i class="fa-solid fa-pencil text-yellow-500" @click="displayInputEditionTask(index)"></i>
                    <i class="px-2 fa-solid fa-trash text-red-600 font-bold" 
                    @click="deleteTask(index)"></i>
                </div>
                <input type="text" 
                    v-model='task.editedName'
                    @keydown="editTask($event,index)"
                    v-if='task.isBeeingEdited'
                    class='outline-none border-none place-content-start'
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