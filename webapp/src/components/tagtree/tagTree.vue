<template>
    <div class="tagTree">
        全景树
        <child-activity/>
    </div>
</template>

<script>
import ChildActivity from '../childActivity/childActivity.vue'
export default {
    data() {
        return {
            nodeData: {}
        }
    },
    components: {
        ChildActivity
    },
    created() {
        this.getNodeData()
    },
    methods: {
        getNodeData() {
            let url = '/cscloud-zone-date/getNodeTree'
            this.$http.get(url).then( function(data) {
                console.log('data', data)
                this.nodeData = data
            })
        }
    }
}
</script>


<style scoped src='./tagTree.css'>

</style>