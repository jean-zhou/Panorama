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

        }
    },
    components: {
        ChildActivity
    }
}
</script>


<style scoped src='./tagTree.css'>

</style>