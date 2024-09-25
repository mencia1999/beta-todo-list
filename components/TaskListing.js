app.component('task-listing',{
    props: {
        taskList : {
            type: Array,
            required: true
        }
    },
    template :
    /*html*/
    `
        <div class="task-list w-11/12 bg-[#eee]">
            <div class="p-2 task-list-item flex justify-between bg-white rounded-xl m-5"
                v-for="(task,index) in taskList"
                :key="index"
            >
                <p class="px-1"> {{ task }}</p>
                <div class="task-item-option">
                    <i class="px-2 fa-solid fa-check text-green-600" @click="markTaskAsDone(index)"></i>
                    <i class="px-2 fa-solid fa-x text-red-600" @click="deleteTask(index)"></i>
                </div>
                
            </div>
        </div>
    `,
    methods: {
       
        markTaskAsDone(taskIndex){
            
            this.$emit('marked-as-done', taskIndex)
        },
        deleteTask(taskIndex){
            this.$emit('task-deleted', taskIndex)
        }
    }
})